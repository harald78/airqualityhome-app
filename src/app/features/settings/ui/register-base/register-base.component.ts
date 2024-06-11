import {Component, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {RegisterBaseService} from "../../service/register-base.service";
import {SensorBase} from "../../../../shared/model/sensor-base.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {UnitPipe} from "../../../../shared/pipes/unit.pipe";
import {RegisterRequest} from "../../model/register-request.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegisterModalComponent} from "../register-modal/register-modal.component";
import {AuthState} from "../../../../core/auth/+state/auth.state";
import {ConfirmModalComponent} from "../../../../shared/components/confirm-modal/confirm-modal.component";
import { Router } from '@angular/router';
import { Toast, ToastService } from '../../../../shared/components/toast/toast.service';
import { mdiCheck } from '@mdi/js';

@Component({
  selector: 'app-register-base',
  standalone: true,
  imports: [
    UnitPipe
  ],
  templateUrl: './register-base.component.html',
  styleUrl: './register-base.component.scss'
})
export class RegisterBaseComponent implements OnInit {

  private readonly registerBaseService = inject(RegisterBaseService);
  private readonly modalService = inject(NgbModal);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  sensorBases: Signal<SensorBase[]> = toSignal(this.registerBaseService.getAvailableSensorBases(), {initialValue: []});
  activeRequest: WritableSignal<RegisterRequest | undefined> = signal(undefined);

  async ngOnInit() {
    const activeRequest = await this.registerBaseService.getActiveRegistrationsByUser();
    this.activeRequest.set(activeRequest);
  }

  async openModal(base: SensorBase) {
    const modalRef = this.modalService.open(RegisterModalComponent);
    modalRef.componentInstance.name = base.name;
    await modalRef.result.then( async (result) => {
      if (result) {
        const registerRequest: RegisterRequest = {
          location: result, sensorBaseId: base.id, userId: this.authState.user().id!
        };
        const requestResult = await this.registerBaseService.sendRegisterRequest(registerRequest);
        if (requestResult) {
          this.activeRequest.set(requestResult);
          const successToast: Toast = {classname: "bg-success text-light", header: '',
            id: "settings-success",
            body: "Created register request successfully", icon: mdiCheck, iconColor: "white"};
          this.toastService.show(successToast);
        }
      }
    });
  }

  async cancelRequest(base: SensorBase) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = "Do you really want to cancel this registration?";
    await modalRef.result.then( async (result) => {
      if (result) {
        const registerRequest: RegisterRequest = {
          location: '', sensorBaseId: base.id, userId: this.authState.user().id!
        };
        const requestResult = await this.registerBaseService.cancelRegisterRequest(registerRequest);
        if (requestResult) {
          this.activeRequest.set(requestResult);
          const successToast: Toast = {classname: "bg-success text-light", header: '',
            id: "settings-success",
            body: "Canceled register request successfully", icon: mdiCheck, iconColor: "white"};
          this.toastService.show(successToast);
        }
      }
    })
  }

  async navigateBack() {
    await this.router.navigate(['/settings']);
  }
}

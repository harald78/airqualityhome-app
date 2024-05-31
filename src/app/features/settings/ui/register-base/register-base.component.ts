import {Component, inject, Signal} from '@angular/core';
import {RegisterBaseService} from "../../service/register-base.service";
import {SensorBase} from "../../../../shared/model/sensor-base.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {UnitPipe} from "../../../../shared/pipes/unit.pipe";

@Component({
  selector: 'app-register-base',
  standalone: true,
  imports: [
    UnitPipe
  ],
  templateUrl: './register-base.component.html',
  styleUrl: './register-base.component.scss'
})
export class RegisterBaseComponent {

  private readonly registerBaseService = inject(RegisterBaseService);

  sensorBases: Signal<SensorBase[]> = toSignal(this.registerBaseService.getAvailableSensorBases(), {initialValue: []});
}

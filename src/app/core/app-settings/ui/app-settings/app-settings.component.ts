import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppSettingsState } from '../../+state/app-settings.state';
import { AppSettings, AppSettingsForm, SettingsType } from '../../model/app-settings.model';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { mdiContentSaveOutline, mdiRestore } from '@mdi/js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise, take } from 'rxjs';

@Component({
  selector: 'app-app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, IconButtonComponent],
  templateUrl: './app-settings.component.html',
  styleUrl: './app-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent implements OnInit {

    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly appSettingsState: AppSettingsState = inject(AppSettingsState);
    private readonly modalService = inject(NgbModal);
    private readonly router: Router = inject(Router);
    protected readonly mdiContentSaveOutline = mdiContentSaveOutline;
    protected readonly mdiRestore = mdiRestore;
    buttonDisabled: boolean = true;
    protected resettable: Signal<boolean> = this.appSettingsState.isCustomSetting;
    previousUrl: string;

    public appSettingsForm: FormGroup<AppSettingsForm>  = this.fb.group<AppSettingsForm>({
      'host': new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      'port': new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
      'api': new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      'https': new FormControl<boolean>(false, {nonNullable: true, validators: [Validators.required]}),
      'tokenRefreshInterval': new FormControl<number>(0, {nonNullable: true, validators: [Validators.min(60), Validators.required]}),
      'dashboardRefreshInterval': new FormControl<number>(0, {nonNullable: true, validators: [Validators.min(60), Validators.required]}),
      'darkMode': new FormControl<boolean>(false, {nonNullable: true, validators: Validators.required}),
    });

    async ngOnInit() {
      this.initForm();
      this.router.events
        .pipe(take(1), filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
        .subscribe((events: RoutesRecognized[]) => {

          this.previousUrl = events[0].urlAfterRedirects;
        });
    }

    async saveData(): Promise<void> {
      const appSettings: AppSettings = this.appSettingsForm.value as AppSettings;
      appSettings.type = SettingsType.CUSTOM;
      appSettings.dashboardRefreshInterval = appSettings.dashboardRefreshInterval * 1000;
      appSettings.tokenRefreshInterval = appSettings.tokenRefreshInterval * 1000;
      await this.appSettingsState.saveAppSettings(appSettings);
    }

    valueChange() {
      const formState = this.appSettingsForm.value as AppSettings;
      const changed = this.appSettingsState.appSettings().host !== formState.host ||
        this.appSettingsState.appSettings().port !== formState.port ||
        this.appSettingsState.appSettings().api !== formState.api ||
        this.appSettingsState.appSettings().https !== formState.https ||
        this.appSettingsState.appSettings().tokenRefreshInterval !== (formState.tokenRefreshInterval * 1000) ||
        this.appSettingsState.appSettings().dashboardRefreshInterval !== (formState.dashboardRefreshInterval * 1000) ||
        this.appSettingsState.appSettings().darkMode !== formState.darkMode;
      console.log(this.appSettingsState.appSettings());
      console.log("valueChange: ", changed);
      this.buttonDisabled = !changed || !this.appSettingsForm.valid;
    }

  async restoreData() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = "Do you really want to restore the app settings?";
    await modalRef.result.then(async (result) => {
      if (result) {
        await this.appSettingsState.restoreDefaultSettings();
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.appSettingsForm.patchValue(this.appSettingsState.appSettings());
    this.appSettingsForm.get('tokenRefreshInterval')?.setValue(this.appSettingsForm.get('tokenRefreshInterval')?.value! / 1000);
    this.appSettingsForm.get('dashboardRefreshInterval')?.setValue(this.appSettingsForm.get('dashboardRefreshInterval')?.value! / 1000);
  }

  navigateBack() {
    if (!this.previousUrl) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigateByUrl(this.previousUrl);
    }
  }
}

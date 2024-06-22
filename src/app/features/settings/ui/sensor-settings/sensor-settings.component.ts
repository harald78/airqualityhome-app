import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {Sensor, SensorSettingsForm} from '../../model/sensor.model';
import { SensorSettingsState } from "../../+state/sensor.state";
import { mdiContentSaveOutline } from "@mdi/js";
import { IconButtonComponent } from "../../../../shared/components/icon-button/icon-button.component";

@Component({
  selector: 'app-sensor-settings',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    IconButtonComponent
  ],
  templateUrl: './sensor-settings.component.html',
  styleUrls: ['./sensor-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorSettingsComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly sensorSettingsState: SensorSettingsState = inject(SensorSettingsState);
  buttonDisabled: boolean = true;
  private readonly selectedSensor = this.sensorSettingsState.selectedSensor;

  public sensorSettingsForm: FormGroup<SensorSettingsForm> = this.fb.group<SensorSettingsForm>({
    location: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    alarmMin: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')] }),
    alarmMax: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')] }),
    alarmActive: new FormControl<boolean>(false, { nonNullable: true, validators: Validators.required }),
    warningThreshold: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')] }),
    linearCorrectionValue: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')] })
  });


  async ngOnInit() {
    this.initForm();
  }

  async saveData(): Promise<void> {
    const sensor: Sensor = this.sensorSettingsForm.value as Sensor;
    await this.sensorSettingsState.saveSensorSettings(sensor);
  }

  valueChange() {
    const selectedSensor = this.selectedSensor();
    if (!selectedSensor) return;

    const formState = this.sensorSettingsForm.value as Partial<Sensor>;
    const changed = selectedSensor.location !== formState.location ||
      selectedSensor.alarmMin !== formState.alarmMin ||
      selectedSensor.alarmMax !== formState.alarmMax ||
      selectedSensor.alarmActive !== formState.alarmActive ||
      selectedSensor.warningThreshold !== formState.warningThreshold ||
      selectedSensor.linearCorrectionValue !== formState.linearCorrectionValue;

    console.log(selectedSensor);
    console.log("valueChange: ", changed);
    this.buttonDisabled = !changed || !this.sensorSettingsForm.valid;
  }

  initForm(): void {
    const selectedSensor = this.selectedSensor();
    console.log(selectedSensor);
    if (selectedSensor) {
      this.sensorSettingsForm.patchValue(selectedSensor);
    }
  }

  async register() {
    await this.router.navigate(['/settings/register'], { relativeTo: null });
  }

  async navigateBack() {
    await this.router.navigate(['settings']);
  }

  protected readonly mdiContentSaveOutline = mdiContentSaveOutline;
}

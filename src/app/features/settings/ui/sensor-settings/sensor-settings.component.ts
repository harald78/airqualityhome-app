import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {Sensor, SensorSettingsForm} from '../../model/sensor.model';
import { SensorSettingsState } from "../../+state/sensor.state";
import {mdiContentSaveOutline, mdiRestore} from "@mdi/js";
import { IconButtonComponent } from "../../../../shared/components/icon-button/icon-button.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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

  protected readonly mdiContentSaveOutline = mdiContentSaveOutline;
  protected readonly mdiRestore = mdiRestore;
  private readonly router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly sensorSettingsState: SensorSettingsState = inject(SensorSettingsState);
  buttonDisabled: boolean = true;
  private readonly selectedSensor = this.sensorSettingsState.selectedSensor;

  // Validators.pattern('^\\d*\\.?\\d*$')
  public sensorSettingsForm: FormGroup<SensorSettingsForm> = this.fb.group<SensorSettingsForm>({
    location: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    alarmMin: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    alarmMax: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    alarmActive: new FormControl<boolean>(false, { nonNullable: true, validators: Validators.required }),
    warningThreshold: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    linearCorrectionValue: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] })
  });

  constructor() {
    this.sensorSettingsForm.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(() => this.valueChange());
  }


  async ngOnInit() {
    this.initForm();
  }

  async saveData(): Promise<void> {
    const changedData: Partial<Sensor> = this.sensorSettingsForm.value as Partial<Sensor>;
    const alarmMin = this.mayBeCorrectNumericValue(this.sensorSettingsForm.value.alarmMin ?? 0);
    const alarmMax = this.mayBeCorrectNumericValue(this.sensorSettingsForm.value.alarmMax ?? 0);
    const warningThreshold = this.mayBeCorrectNumericValue(this.sensorSettingsForm.value.warningThreshold ?? 0);
    const linearCorrectionValue = this.mayBeCorrectNumericValue(this.sensorSettingsForm.value.linearCorrectionValue ?? 0);

    const sensor: Sensor = {
      ...this.selectedSensor()!,
      ...changedData,
      alarmMax: alarmMax,
      alarmMin: alarmMin,
      warningThreshold: warningThreshold,
      linearCorrectionValue: linearCorrectionValue
    };
    await this.sensorSettingsState.saveSensorSettings(sensor);
    await this.router.navigate(['settings']);
  }

  mayBeCorrectNumericValue(value: number | string): number {
    if (typeof value === 'string') {
      return parseFloat(value.replace(",", "."));
    }

    return value;
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

    this.buttonDisabled = !changed || !this.sensorSettingsForm.valid;
  }

  initForm(): void {
    const selectedSensor = this.selectedSensor();
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

  restoreData() {
    this.initForm();
  }
}

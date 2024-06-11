import {Component, inject, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import { mdiBell, mdiMapMarker, mdiUpdate } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import {DatePipe} from "@angular/common";
import {UnitPipe} from "../../../../shared/pipes/unit.pipe";
import {SeverityCalculationService} from "../../service/severity-calculation.service";

@Component({
  selector: 'app-measurement-tile',
  standalone: true,
  imports: [
    IconComponent,
    DatePipe,
    UnitPipe
  ],
  templateUrl: './measurement-tile.component.html',
  styleUrl: './measurement-tile.component.scss'
})
export class MeasurementTileComponent implements OnInit {
  protected readonly mdiBell = mdiBell;
  protected readonly mdiUpdate = mdiUpdate;
  protected readonly mdiMapMarker = mdiMapMarker;

  public severity: WritableSignal<string> = signal('success');
  private readonly severityService: SeverityCalculationService = inject(SeverityCalculationService);

  value: InputSignal<number> = input(0.0);
  alarmActive: InputSignal<boolean> = input(false);
  type: InputSignal<string> = input('');
  warningThreshold: InputSignal<number> = input(0.0);
  linearCorrectionValue: InputSignal<number> = input(0.0);
  name: InputSignal<string> = input('');
  base: InputSignal<string> = input('');
  alarmMin: InputSignal<number> = input(0.0);
  alarmMax: InputSignal<number> = input(0.0);
  timestamp: InputSignal<Date> = input(new Date());
  location: InputSignal<string> = input('');

  ngOnInit() {
    const severity = this.alarmActive() ? this.severityService.getSeverity(this.warningThreshold(), this.value(), this.alarmMin(), this.alarmMax()): 'success';
    this.severity.set(severity);
  }
}

import {patchState, signalStore, withMethods} from "@ngrx/signals";
import {removeAllEntities, setEntities, withEntities} from "@ngrx/signals/entities";
import {LatestMeasurement} from "../model/measurement.model";
import {inject} from "@angular/core";
import {MeasurementService} from "../service/measurement.service";

export const MeasurementState = signalStore(
  {providedIn: 'root'},
  withEntities<LatestMeasurement>(),
  withMethods((store) => {
    const measurementService = inject(MeasurementService);
    return {
      async clearAllMeasurements() {
        patchState(store, removeAllEntities());
      },
      async loadLatestMeasurements() {
        const latestMeasurements = await measurementService.getLatestMeasurements();
        patchState(store, setEntities(latestMeasurements));
      }
    }
  })
);

export type MeasurementState = InstanceType<typeof MeasurementState>;

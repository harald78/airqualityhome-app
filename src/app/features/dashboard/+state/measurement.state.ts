import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {LatestMeasurement} from "../model/measurement.model";
import {computed, inject} from "@angular/core";
import {MeasurementService} from "../service/measurement.service";

export interface SelectedState {
  selectedId: number | null;
  entities: LatestMeasurement[];
}

export const initialState: SelectedState = {
  selectedId: null,
  entities: []
};

export const MeasurementState = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store) => {
    const measurementService = inject(MeasurementService);
    return {
      async clearAllMeasurements() {
        patchState(store, {entities: []});
      },
      async loadLatestMeasurements() {
        const latestMeasurements = await measurementService.getLatestMeasurements();
        patchState(store, {entities: latestMeasurements});
      },
      async selectId(id: number | null) {
        patchState(store, {selectedId: id});
      }
    }
  }),
  withComputed(({entities, selectedId}) => ({
    filteredBySelection: computed(() => {
      return entities().find(e => e.id == selectedId());
    })
  }))
);

export type MeasurementState = InstanceType<typeof MeasurementState>;

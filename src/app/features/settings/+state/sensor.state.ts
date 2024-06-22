import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Sensor } from "../model/sensor.model";
import { SensorSettingsService } from "../service/sensor-settings.service";
import { computed, inject } from "@angular/core";

export interface SensorSettings {
  sensors: Sensor[],
  selected: number | null
}

const initialState: SensorSettings = {
  sensors: [] as Sensor[],
  selected: null
}

export const SensorSettingsState = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const sensorService: SensorSettingsService = inject(SensorSettingsService);
    return {
      async loadSensor() {
        const sensors = await sensorService.getAvailableSensors();
        patchState(store, { sensors: sensors });
      },
      async selectSensor(id: number) {
        patchState(store, { selected: id });
      },
      async saveSensorSettings(sensor: Sensor) {
      const savedSensor = await sensorService.saveSensorToServer(sensor);

      patchState(store, {
        sensors: store.sensors().map(s => s.id === savedSensor.id ? savedSensor : s)
      });
      },
      clearSensorSelection() {
        patchState(store, { selected: null });
      }
    }
  }),
  withComputed(({ sensors, selected }) => ({
    selectedSensor: computed(() => sensors().find(s => s.id === selected()))
  }))
);

export type SensorSettingsState = InstanceType<typeof SensorSettingsState>;

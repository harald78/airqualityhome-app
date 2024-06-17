import {signalStore, withState} from "@ngrx/signals";
import {Sensor} from "../model/sensor.model";

//
// export interface SensorSettingsState {
//   sensor: Sensor[],
//   selected: number | null
// }
//
//
// export const SensorSettingsState = signalStore(
//   {providedIn: 'root'},
//   withState( {
//     sensor: [] as Sensor[],
//     selected: null
//   } ),
// );
//
// export type SensorSettingsState = InstanceType<typeof SensorSettingsState>;

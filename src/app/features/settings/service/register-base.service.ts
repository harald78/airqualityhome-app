import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SensorBase} from "../../../shared/model/sensor-base.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterBaseService {

  constructor(private httpService: HttpClient) { }


  getAvailableSensorBases() {
    return this.httpService.get<SensorBase[]>(`${environment.baseUrl}/register/sensorBase`);
  }
}

import {RegisterRequest} from "../src/app/features/settings/model/register-request.model";

export const activeRegisterRequest: RegisterRequest = {
  active: true, canceled: false, id: 0, location: "Living room", sensorBaseId: 1, userId: 1
}

export const canceledRegisterRequest: RegisterRequest = {
  active: false, canceled: true, id: 0, location: "Living room", sensorBaseId: 1, userId: 1
}

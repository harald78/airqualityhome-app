export interface RegisterRequest {
  id?: number;
  userId: number;
  sensorBaseId: number;
  active?: boolean;
  canceled?: boolean;
  location: string;
}

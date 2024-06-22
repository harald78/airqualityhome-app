
export interface Notification {
  id: number;
  userId: number;
  measurementId: number;
  message: string;
  acknowledged: boolean;
  readAt: Date;
  baseName: string;
  sensorType: string;
  sensorName: string;
  location: string;
  timestamp: Date;
}

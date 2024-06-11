export interface Notification {

  id?: number;
  userId: number;
  measurementId: number;
  message: string;
  read: boolean;
}

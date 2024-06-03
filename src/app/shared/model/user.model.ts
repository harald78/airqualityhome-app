
export interface User {
  id?: number,
  email: string,
  username: string,
  roles: string[],
}

export interface UserChangeRequest {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface PasswordChangeRequest {
  id: number;
  username: string;
  password: string;
  oldPassword: string;
}

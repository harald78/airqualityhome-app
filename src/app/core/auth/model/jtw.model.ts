
export interface JwtDto {
  accessToken: string;
  token: string;
}

export interface RefreshTokenRequestDto {
  token: string;
}

export interface JWTResponse {
  verified: boolean;
  uid?: string;
}

export interface AuthResponse {
  data: JWTResponse;
}

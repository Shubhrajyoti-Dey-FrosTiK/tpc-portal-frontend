import { JWTVerifyResult } from "jose";

export interface AuthResponse {
  data: {
    verified: boolean | JWTVerifyResult;
  };
}

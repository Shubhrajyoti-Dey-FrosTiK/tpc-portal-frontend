import * as jose from "jose";
import { JWTResponse } from "../types/Response";

export class JWT {
  checkValidity(token: jose.JWTVerifyResult, publicKeys: Object): JWTResponse {
    const payload = token.payload;
    const protectedHeader = token.protectedHeader;
    console.log("PAYLOAD", payload, "PROTECTED HEADER", protectedHeader);
    const now = Number(
      Date.now().toString().substr(0, payload.exp.toString().length)
    );
    if (
      publicKeys[protectedHeader.kid] &&
      protectedHeader.alg === "RS256" &&
      payload.exp > now &&
      payload.iat <= now &&
      payload.auth_time <= now &&
      payload.sub.length
    ) {
      console.log("Verified");
      return {
        verified: true,
        uid: payload.sub,
      };
    } else {
      return { verified: false };
    }
  }

  async verify(token: string): Promise<JWTResponse> {
    const publicKeys = await (
      await fetch(
        "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
        { method: "GET" }
      )
    ).json();
    let verifiedToken: JWTResponse = { verified: false };
    for (let key in publicKeys) {
      try {
        const decodedToken = await jose.jwtVerify(
          token,
          await jose.importX509(publicKeys[key], "RS256"),
          {
            algorithms: ["RS256"],
            issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
            audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          }
        );
        verifiedToken = this.checkValidity(decodedToken, publicKeys);
        if (verifiedToken.verified) break;
      } catch (error) {}
    }
    return verifiedToken;
  }
}

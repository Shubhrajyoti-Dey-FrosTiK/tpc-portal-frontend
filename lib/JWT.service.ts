import * as jose from "jose";

export class JWT {
  async verify(token: string): Promise<jose.JWTVerifyResult | boolean> {
    const publicKeys = await (
      await fetch(
        "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
        { method: "GET" }
      )
    ).json();
    console.log(token);
    let verifiedToken: jose.JWTVerifyResult;
    for (let key in publicKeys) {
      try {
        verifiedToken = await jose.jwtVerify(
          token,
          await jose.importX509(publicKeys[key], "RS256"),
          {
            algorithms: ["RS256"],
            issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
            audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          }
        );
        break;
      } catch (error) {}
    }
    return verifiedToken ? verifiedToken : false;
  }
}

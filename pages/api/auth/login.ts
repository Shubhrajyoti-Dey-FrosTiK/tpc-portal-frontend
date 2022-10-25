// Constants
import { NextRequest } from "next/server";
import { STATUS } from "../../../constants/codes";

// Server Side Services
import JSONResponse from "../../../lib/JSON.service";
import { JWT } from "../../../lib/JWT.service";

export const config = {
  runtime: "experimental-edge",
};

const Response = new JSONResponse();
const JwtService = new JWT();

export default async function handler(req: NextRequest) {
  return Response.process(
    await JwtService.verify(req.headers.get("token")),
    STATUS.SUCCESS
  );
}

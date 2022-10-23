import { STATUS } from "../../../constants/codes";

// Types
import type { NextRequest } from "next/server";

// Server Side Services
import JSONResponse from "../../../utils/JSON.service";

export const config = {
  runtime: "experimental-edge",
};

const Response = new JSONResponse();

export default async function handler(req: NextRequest) {
  return Response.process({ name: "Hellp" }, STATUS.SUCCESS);
}

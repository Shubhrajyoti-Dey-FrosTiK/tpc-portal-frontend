import type { NextRequest } from "next/server";

export default class JSONResponse {
  process(res: Object, statusCode: number) {
    return new Response(JSON.stringify(res), {
      status: statusCode,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

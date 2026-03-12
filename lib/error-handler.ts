import { NextResponse } from "next/server";
import { ApiError } from "./errors";

export const withApiErrorHandle = (handler) => async (req, resp) => {
    try {
        return await handler(req, resp);
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json({
                status: error.status,
                errorCode: error.errCode,
                message: error.message,
            })
        }

        throw error;
    }
}

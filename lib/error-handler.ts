import { NextResponse } from "next/server";
import { ApiError } from "./errors";
import { HttpError } from "@/types";

export const withApiErrorHandle = (handler) => async (req, resp) => {
    try {
        return await handler(req, resp);
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json({
                status: error.status,
                errorCode: error.errCode,
                message: error.message,
            }, {
                status: error.status,
            })
        }

        return NextResponse.json({
            status: 500,
            errorCode: HttpError.INTERNAL_ERROR,
            message: "Internal server error",
        }, {
            status: 500,
        })
    }
}

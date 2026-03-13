import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./errors";
import { HttpErrorCode } from "@/types";

type RouteHandler<TContext = unknown> = (
    req: NextRequest,
    context: TContext
) => Promise<NextResponse> | NextResponse;

export const withApiErrorHandle = (handler: RouteHandler) => async (req: NextRequest, context: unknown) => {
    try {
        return await handler(req, context);
    } catch (error) {
        console.error(error)

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
            errorCode: HttpErrorCode.INTERNAL_ERROR,
            message: "Internal server error",
        }, {
            status: 500,
        })
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { withApiErrorHandle } from '@/lib/error-handler'
import { SendMessageResponse } from './types'
import { AiService } from '@/services/backend/ai.service'

const aiService = new AiService()

export const POST = withApiErrorHandle(async (req: NextRequest): Promise<NextResponse<SendMessageResponse>> => {
  const { messages } = await req.json()

  const responseMessage = await aiService.sendMessage(messages)

  return NextResponse.json({
    message: responseMessage,
  })
})

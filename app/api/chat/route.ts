import { NextRequest, NextResponse } from 'next/server'
import { ChatService } from './service'
import { withApiErrorHandle } from '@/lib/error-handler'
import { SendMessageResponse } from './types'

const chatService = new ChatService()

export const POST = withApiErrorHandle(async (req: NextRequest): Promise<NextResponse<SendMessageResponse>> => {
  const { messages } = await req.json()

  const responseMessage = await chatService.sendMessage(messages)

  return NextResponse.json({
    message: responseMessage,
  })
})

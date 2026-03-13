import { NextRequest, NextResponse } from 'next/server'
import { withApiErrorHandle } from '@/lib/backend/error-handler'
import { TranscribeResponse } from './types'
import { AiService } from '@/services/backend/ai.service'

const aiService = new AiService()

export const POST = withApiErrorHandle(async (req: NextRequest): Promise<NextResponse<TranscribeResponse>> => {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const text = await aiService.transcribeAudio(file)

  return NextResponse.json({
    text: text,
  })
})

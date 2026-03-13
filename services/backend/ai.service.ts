import { BaseMessage, ChatMessage, HttpErrorCode, MessageRole } from '@/types'
import { ApiError } from '@/lib/backend/errors'
import OpenAI from 'openai'

const SYSTEM_PROMPT: BaseMessage = {
  role: MessageRole.SYSTEM,
  content: `
    You are a friendly assistant.
    If possible, respond in the user's language.
    Be polite.
  `,
}

export class AiService {
    private openai: OpenAI

    constructor() {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL: "https://api.groq.com/openai/v1"
        });
    }

    async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
      if (!messages.length) {
        throw new ApiError('Empty messages array', HttpErrorCode.BAD_REQUEST)
      }

      try {
        const completion = await this.openai.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [SYSTEM_PROMPT, ...messages],
        });

        return {
          ...completion.choices[0].message,
          id: crypto.randomUUID(),
          date: new Date(),
        } as ChatMessage;

      } catch (error: unknown) {
        this.handleErrors(error)
      }
    }

    async transcribeAudio(file: File): Promise<string> {
      if (!file) {
        throw new ApiError("No audio file provided", HttpErrorCode.BAD_REQUEST);
      }

      try {
        const transcription = await this.openai.audio.transcriptions.create({
          file: file,
          model: "whisper-large-v3-turbo",
          response_format: "json",
        });

        return transcription.text;
      } catch (error: unknown) {
        this.handleErrors(error)
      }
    }

    handleErrors(error: unknown): never {
      if (error instanceof OpenAI.APIError) {
          switch (error.status) {
            case 401:
              throw new ApiError('Invalid API key', HttpErrorCode.UNAUTHORIZED)
            case 429:
              throw new ApiError('Too many requests', HttpErrorCode.TOO_MANY_REQUESTS)
            default:
              throw new ApiError('OpenAI API error')
          }
        }

        throw error
    }
}

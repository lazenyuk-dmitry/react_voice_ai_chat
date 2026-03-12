import { ChatMessage, HttpError } from '@/types'
import { ApiError } from '@/lib/errors'
import OpenAI from 'openai'

export class ChatService {
    private openai: OpenAI

    constructor() {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL: "https://api.groq.com/openai/v1"
        });
    }

    async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
      try {
        if (!messages.length) {
          throw new ApiError('Empty messages array', HttpError.BAD_REQUEST)
        }

        const completion = await this.openai.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages,
        });

        return completion.choices[0].message as ChatMessage;

      } catch (error: unknown) {
        if (error instanceof OpenAI.APIError) {
          switch (error.status) {
            case 401:
              throw new ApiError('Invalid API key', HttpError.UNAUTHORIZED)
            case 429:
              throw new ApiError('Too many requests', HttpError.TOO_MANY_REQUESTS)
            default:
              throw new ApiError('OpenAI API error')
          }
        }
        throw new ApiError('Неизвестная ошибка')
      }
    }
}

import { ChatMessage, HttpError } from '@/types'
import { ApiError } from '@/lib/errors'
import OpenAI from 'openai'

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
        throw new ApiError('Empty messages array', HttpError.BAD_REQUEST)
      }

      try {
        const completion = await this.openai.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages,
        });

        return completion.choices[0].message as ChatMessage;

      } catch (error: unknown) {
        this.handleErrors(error)
      }
    }

    async transcribeAudio(file: File): Promise<string> {
      if (!file) {
        throw new ApiError("No audio file provided", HttpError.BAD_REQUEST);
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

    handleErrors(error: unknown) {
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

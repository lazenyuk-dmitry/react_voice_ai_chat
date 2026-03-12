import { ChatMessage } from "@/types"

export interface TranscribeRequest {
  messages: ChatMessage[]
}

export interface TranscribeResponse {
  text: string
}

import { ChatMessage } from "@/types"

export interface SendMessageRequest {
  messages: ChatMessage[]
}

export interface SendMessageResponse {
  message: ChatMessage
}

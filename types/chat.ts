import { BaseMessage } from "./shared"

export interface ChatMessage extends BaseMessage {
  id: string
  date: Date
}

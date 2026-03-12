import { MessageRole } from "./shared"

export interface ChatMessage {
    role: MessageRole
    content: string
}

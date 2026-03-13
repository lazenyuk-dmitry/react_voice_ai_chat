export enum MessageRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface BaseMessage {
  role: MessageRole
  content: string
}

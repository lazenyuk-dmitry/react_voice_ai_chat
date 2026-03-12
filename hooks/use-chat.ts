import { useState, useCallback, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { HttpClient } from '@/lib/http-client'
import { MessageRole } from '@/types'

// const MAX_CONTEXT_MESSAGES = 10
// const WELCOME_MESSAGE: Message = {
//   id: 'welcome',
//   role: 'assistant',
//   content: 'Hi there! What would you like to know?',
//   timestamp: new Date()
// }

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const http = new HttpClient()


  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage = {
      role: MessageRole.USER,
      content: text.trim(),
    }

    setIsLoading(true);
    setMessages(prev => [...prev, newUserMessage])

    try {
      const response = await http.post("/chat", {
        messages: [...messages, newUserMessage]
      });

      const { message: receivedMessage } = await response.json();

      setMessages(prev => [...prev, receivedMessage])
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    hasMessages: messages.length > 1
  }
}

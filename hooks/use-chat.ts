import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import * as api from "@/services/api.service";
import { MessageRole } from '@/types'
import { useLocalStorageState } from './use-local-storage';

const MAX_LOCAL_STORAGE = 50
const MAX_CONTEXT_MESSAGES = 10

export function useChat() {
  const [messages, setMessages, resetStorage] = useLocalStorageState<ChatMessage[]>('chat_history', [])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage = {
      id: self.crypto.randomUUID(),
      role: MessageRole.USER,
      content: text.trim(),
      date: new Date(),
    }

    setIsLoading(true);
    setMessages(prev => [...prev, newUserMessage])

    try {
      const { message: receivedMessage } = await api.sendMessage(
        [...messages.slice(-MAX_CONTEXT_MESSAGES), newUserMessage].map(m => ({
          role: m.role,
          content: m.content,
        }))
      );
      setMessages(prev => [...prev, receivedMessage].slice(-MAX_LOCAL_STORAGE))
    } catch (e: unknown) {
      setMessages(prev => prev.slice(0, -1))
      throw e
    } finally {
      setIsLoading(false);
    }
  };

  const newDialog = () => {
    resetStorage()
  }

  return {
    messages,
    isLoading,
    sendMessage,
    newDialog,
    hasMessages: messages.length > 1
  }
}

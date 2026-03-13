import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import * as api from "@/services/api.service";
import { MessageRole } from '@/types'
import { useLocalStorageState } from './use-local-storage';

const MAX_LOCAL_STORAGE = 50
const MAX_CONTEXT_MESSAGES = 10
const SYSTEM_PROMPT: ChatMessage = {
  role: MessageRole.SYSTEM,
  content: `
    You are a friendly assistant.
    If possible, respond in the user's language.
    Be polite.
  `,
}

export function useChat() {
  const [messages, setMessages, resetStorage] = useLocalStorageState<ChatMessage[]>('chat_history', [])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage = {
      role: MessageRole.USER,
      content: text.trim(),
    }

    setIsLoading(true);
    setMessages(prev => [...prev, newUserMessage])

    try {
      const { message: receivedMessage } = await api.sendMessage(
        [SYSTEM_PROMPT, ...messages.slice(-MAX_CONTEXT_MESSAGES), newUserMessage]
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

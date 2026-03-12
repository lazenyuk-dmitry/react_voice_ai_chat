import { ChatMessage } from "@/types"

export interface ChatDialogProps {
  className?: string
  isLoading?: boolean
  messages: ChatMessage[]
}

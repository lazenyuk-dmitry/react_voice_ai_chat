export interface ChatInputProps {
  isLoading: boolean
  onSend: (text: string) => Promise<void>
}

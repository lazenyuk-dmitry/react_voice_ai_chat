export interface ChatInputProps {
  isLoading?: boolean
  onSend?: (text: string) => void
  onStartRecord?: () => void,
  onStopRecord?: (file: Blob) => void,
}

export interface ChatInputRef {
  clearText: () => void
  focus: () => void
  setText: (text: string) => void
}

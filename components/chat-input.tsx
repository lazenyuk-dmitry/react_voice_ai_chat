"use client"

import { forwardRef, useImperativeHandle, useState } from "react";
import { Mic, Send } from "lucide-react"
import { ChatInputProps, ChatInputRef } from "./chat-input.types"
import { useMediaRecorder, useAudioTranscribe } from "@/hooks"
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupButton, Spinner } from "./ui";
import TextareaAutosize from 'react-textarea-autosize'
import { AnimatePresence, motion } from "framer-motion";

export default forwardRef<ChatInputRef, ChatInputProps>(function ChatInput({
  onSend,
  onStartRecord,
  onStopRecord,
  isLoading = false,
}, ref) {
  const [text, setText] = useState("")
  const { isRecording, startRecording, stopRecording } = useMediaRecorder()
  const { isLoading: audioProcessed, transcribeAudio } = useAudioTranscribe()

  useImperativeHandle(ref, () => ({
    clearText: () => setText(""),
    focus: () => {
      const textarea = document.querySelector('textarea')
      textarea?.focus()
    },
    setText: (newText: string) => setText(newText)
  }))

  const handleSend = (text: string) => {
    onSend?.(text)
  }

  const handleStartRecord = () => {
    startRecording()
    onStartRecord?.()
  }

  const handleStopRecord = async () => {
    const file = await stopRecording()

    if (file) {
      let text = await transcribeAudio(file)

      if (text.trim() === ".") {
        text = ""
      }

      onStopRecord?.(text)
      setText(text)
      handleSend(text)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(text);
    }
  }

  return (
    <InputGroup
      className="bg-[#0a3a8c] rounded-xl border border-blue-400/20 p-0 shadow-2xl focus-within:ring-1 focus-within:ring-blue-400/50 transition-all"
    >
      <InputGroupAddon className="py-0 pl-1">
        <InputGroupButton
          className={cn(
            "text-blue-300 transition-all duration-20 rounded-xl md:size-18 my-0",
            isRecording && "bg-red-500! animate-pulse shadow-2xl",
            isLoading && "opacity-50 grayscale"
          )}
          onMouseDown={handleStartRecord}
          onMouseUp={handleStopRecord}
          onMouseLeave={handleStopRecord}
          onTouchStart={handleStartRecord}
          onTouchEnd={handleStopRecord}
          disabled={isLoading}
        >
          <AnimatePresence mode="wait">
            {audioProcessed ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Spinner className="md:size-10 animate-spin text-blue-500" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Mic className="md:size-10 size-8 text-blue-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </InputGroupButton>
      </InputGroupAddon>

      <TextareaAutosize
        className="flex field-sizing-content w-full resize-none rounded-md bg-transparent text-white md:text-xl px-2 py-2.5 transition-[color,box-shadow] outline-none"
        minRows={1}
        maxRows={3}
        placeholder="Ask whatever you want"
        disabled={isLoading || audioProcessed}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      >
      </TextareaAutosize>

      <InputGroupAddon className="py-0 pr-1" align="inline-end">
        <InputGroupButton
          className="bg-blue-600 hover:bg-blue-500 text-white hover:text-white rounded-xl h-full md:size-18 size-12 my-0"
          onClick={() => handleSend(text)}
          disabled={isLoading || audioProcessed}
        >
          <Send className="md:size-10" />
        </InputGroupButton>
      </InputGroupAddon>

    </InputGroup>
  );
})

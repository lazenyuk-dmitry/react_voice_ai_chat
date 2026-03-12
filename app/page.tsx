"use client"

import { useChat } from "@/hooks/use-chat";
import ChatInput from "@/components/chat-input";
import { BotMessageSquare } from "lucide-react";
import { useRef } from "react";
import ChatDialog from "@/components/chat-dialog";
import { ChatInputRef } from "@/components/chat-input.types";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const inputRef = useRef<ChatInputRef>(null)
  const { messages, isLoading, sendMessage, hasMessages } = useChat();

  const handleSend = async (text: string) => {
    await sendMessage(text)
    inputRef.current?.clearText()
  }

  return (
    <main className="flex w-full min-h-0 flex-col items-start grow bg-[#002b6b] p-6 md:p-24 font-sans overflow-auto">
      <div className="flex w-full grow flex-col items-start min-h-0 space-y-10">
        <AnimatePresence mode="popLayout">
          { !hasMessages && (
            <motion.div
                key="placeholderInfo"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              <div className="flex mb-7">
                <div className="bg-[#1e4ba3] p-3 rounded-xl shadow-lg">
                  <BotMessageSquare className="text-white h-18 w-18"/>
                </div>
              </div>

              <div className="space-y-6 text-white">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  Hi there!
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  What would you like to know?
                </h2>
                <div className="space-y-1">
                  <p className="text-blue-100/60 text-lg md:text-xl font-medium">
                    Use one of the most common prompts below
                  </p>
                  <p className="text-blue-100/60 text-lg md:text-xl font-medium">
                    or ask your own question
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ChatDialog isLoading={isLoading} className="flex-auto max-w-4xl" messages={messages}/>

        <div className="w-full max-w-3xl mt-auto">
          <ChatInput ref={inputRef} isLoading={isLoading} onSend={handleSend}/>
        </div>
      </div>
    </main>
  );
}

"use client"

import { useChat } from "@/hooks";
import ChatInput from "@/components/chat-input";
import { BotMessageSquare } from "lucide-react";
import { useRef } from "react";
import ChatDialog from "@/components/chat-dialog";
import { ChatInputRef } from "@/components/chat-input.types";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function Page() {
  const inputRef = useRef<ChatInputRef>(null)
  const { messages, isLoading, sendMessage, hasMessages, newDialog } = useChat();

  const handleSend = async (text: string) => {
    await sendMessage(text)
    inputRef.current?.clearText()
  }

  return (
    <main className="flex w-full min-h-0 flex-col items-start grow bg-[#002b6b] p-6 md:p-15 lg:p-20 xl:p-24 font-sans overflow-auto">
      <div className="flex w-full grow flex-col items-start min-h-0 space-y-10">
        <AnimatePresence mode="popLayout">

          <div className="flex items-center gap-6 mb-7">
            <div className="bg-[#1e4ba3] p-3 rounded-xl shadow-lg">
              <BotMessageSquare
                className={
                  cn(
                    "text-white transition-all duration-500 ease-in-out",
                    hasMessages ? "size-10" : "size-18",
                  )
                }
              />
            </div>
            { hasMessages && (
              <motion.div
                key="newBtn"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  className="p-6 text-white"
                  variant="destructive"
                  onClick={newDialog}
                  disabled={isLoading}
                >
                  New chat
                </Button>
              </motion.div>
            )}
          </div>

          { !hasMessages && (
            <motion.div
              key="placeholderInfo"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
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

        { hasMessages && (
          <ChatDialog isLoading={isLoading} className="flex-auto max-w-4xl" messages={messages}/>
        )}

        <div className="w-full max-w-3xl mt-auto">
          <ChatInput ref={inputRef} isLoading={isLoading} onSend={handleSend}/>
        </div>
      </div>
    </main>
  );
}

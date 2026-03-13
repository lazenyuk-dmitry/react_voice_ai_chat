"use client"

import { SquareUser, BotMessageSquare } from "lucide-react";
import { ChatDialogProps } from "./chat-dialog.types";
import { MessageRole } from "@/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle, TypingIndicator } from "./ui";
import { AnimatePresence, motion } from "framer-motion";
import { formatMessageDate } from "@/lib/utils";

export default function ChatDialog({
  className,
  isLoading = false,
  messages = [],
}: ChatDialogProps) {
  const calcItemClassName = (role: MessageRole) => {
    const defaultClasses = "shadow-sm w-full shrink-0 bg-blue-600 text-white"
    if (role === MessageRole.ASSISTANT) {
      return `${defaultClasses} max-w-9/10 bg-indigo-600`
    }
    return `${defaultClasses} max-w-9/10 ml-auto`
  }

  const getIcon = (role: MessageRole) => {
    if (role === MessageRole.ASSISTANT) {
      return <BotMessageSquare className="size-6" />
    } else {
      return <SquareUser className="size-6" />
    }
  }

  return (
    <div className={"flex h-full gap-8 flex-col-reverse p-1 flex-auto w-full overflow-auto " + className}>

      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            key="typing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TypingIndicator />
          </motion.div>
        )}

        {[...messages].reverse().map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1, transition: { duration: 0.2 } }}
          >
            <Card className={calcItemClassName(message.role)} key={message.id}>
              <CardHeader>
                <CardTitle>{getIcon(message.role)}</CardTitle>
                <CardAction>
                  {formatMessageDate(message.date)}
                </CardAction>
              </CardHeader>
              <CardContent className="md:text-lg">
                <p>{message.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

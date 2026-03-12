"use client"

import { useChat } from "@/hooks/use-chat";
import ChatInput from "@/components/chat-input";
import { BotMessageSquare } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const { messages, isLoading, sendMessage } = useChat();


  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-[#002b6b] p-6 md:p-24 font-sans">
      <div className="w-full max-w-3xl space-y-10">
        <div className="flex">
          <div className="bg-[#1e4ba3] p-3 rounded-xl shadow-lg">
            <BotMessageSquare className="text-white h-18 w-18"/>
          </div>
        </div>

        {/* Текстовый блок с левым выравниванием */}
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

        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}

        {/* Компонент ввода */}
        <div className="w-full max-w-2xl pt-4">
          <ChatInput isLoading={isLoading} onSend={sendMessage}/>
        </div>
      </div>
    </main>
  );
}

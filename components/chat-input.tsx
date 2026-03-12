"use client"

import { useState } from "react";
import { Mic, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { ChatInputProps } from "./chat-input.types";

export default function ChatInput({
  onSend,
  isLoading = false,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    await onSend(text);
  }

  return (
    <div className="flex items-center bg-[#0a3a8c] rounded-2xl border border-blue-400/20 px-4 py-3 shadow-2xl focus-within:ring-1 focus-within:ring-blue-400/50 transition-all">
      <Button variant="ghost" size="icon" className="text-blue-300 hover:bg-transparent rounded">
        <Mic className="h-4 w-4" />
      </Button>

      <Input
        className="bg-transparent border-none text-white text-lg placeholder:text-blue-300/40 focus-visible:ring-0 shadow-none"
        placeholder="Ask whatever you want"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <Button
        className="bg-[#1e56c5] hover:bg-[#2563eb] rounded-xl h-12 w-12 ml-2"
        onClick={handleSend}
      >
        <Send />
      </Button>
    </div>
  );
}

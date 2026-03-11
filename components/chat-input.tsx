"use client";

import { useState, useRef } from "react";
import { Mic, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Логика распознавания речи
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Ваш браузер не поддерживает распознавание речи.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU"; // Устанавливаем язык

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      console.log("Ответ AI:", data.text);
      // Тут можно добавить логику отображения ответа в UI
      setText("");
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-[#0a3a8c] rounded-2xl border border-blue-400/20 px-4 py-3 shadow-2xl focus-within:ring-1 focus-within:ring-blue-400/50 transition-all">
      <Button variant="ghost" size="icon" className="text-blue-300 hover:bg-transparent rounded">
        <Mic className="h-4 w-4" />
      </Button>

      <Input
        className="bg-transparent border-none text-white text-lg placeholder:text-blue-300/40 focus-visible:ring-0 shadow-none"
        placeholder="Ask whatever you want"
      />

      <Button className="bg-[#1e56c5] hover:bg-[#2563eb] rounded-xl h-12 w-12 ml-2">
        <Send />
      </Button>
    </div>
  );
}

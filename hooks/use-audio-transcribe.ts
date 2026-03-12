import { HttpClient } from "@/lib/http-client";
import { useState } from "react";

export const useAudioTranscribe = () => {
    const [audioText, setAudioText] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const http = new HttpClient()

    const transcribeAudio = async (blob: Blob) => {
        const formData = new FormData();

        setIsLoading(true)
        formData.append('file', blob, 'audio.m4a');

        const response = await http.postAsFormData("/transcribe", formData, {
            headers: {},
        });

        const { text } = await response.json()

        setAudioText(text)
        setIsLoading(false)

        return text;
    }

    return {
        audioText,
        isLoading,
        transcribeAudio,
    }
}

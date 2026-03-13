import * as api from "@/services/api.service";
import { useState } from "react";

export const useAudioTranscribe = () => {
    const [audioText, setAudioText] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const sendAudio = async (blob: Blob) => {
        setIsLoading(true)

        const { text } = await api.transcribeAudio(blob);

        setAudioText(text)
        setIsLoading(false)

        return text;
    }

    return {
        audioText,
        isLoading,
        transcribeAudio: sendAudio,
    }
}

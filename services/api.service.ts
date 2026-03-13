import { httpClient } from "@/lib/http-client"
import { BaseMessage } from "@/types";


export async function sendMessage(messages: BaseMessage[]) {
  const response = await httpClient.post("/chat", {
    messages,
  });

  return await response;
}

export const transcribeAudio = async (blob: Blob) => {
  const formData = new FormData();
  formData.append('file', blob, 'audio.m4a');

  const response = await httpClient.postAsFormData("/transcribe", formData, {
      headers: {},
  });

  return await response;
}

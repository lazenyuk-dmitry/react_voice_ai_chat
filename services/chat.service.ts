export async function sendMessage(messages: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages })
  })

  if (!res.ok) {
    throw new Error("Request failed")
  }

  return res.json()
}

const async transcribeAudio(blob: Blob) {
  const formData = new FormData();
  // Groq критичен к расширению файла, указываем .m4a или .wav
  formData.append('file', blob, 'audio.m4a');

  const response = await api.post("/transcribe", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // { text: "..." }
},

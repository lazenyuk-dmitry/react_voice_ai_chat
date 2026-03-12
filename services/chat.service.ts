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

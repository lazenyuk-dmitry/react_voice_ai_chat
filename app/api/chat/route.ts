import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Инициализация клиента
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ключ берем из .env.local
});

export async function POST(req: Request) {
  try {
    const { message } = await req.body.json();

    // Валидация входных данных
    if (!message) {
      return NextResponse.json({ error: "Сообщение не может быть пустым" }, { status: 400 });
    }

    // Запрос к ChatGPT
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Или gpt-4o для лучшего качества
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ text: aiResponse });

  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "Ошибка при обращении к нейросети" },
      { status: 500 }
    );
  }
}

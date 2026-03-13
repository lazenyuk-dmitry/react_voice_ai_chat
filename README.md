# 🤖 Voice AI Chatbot

Интеллектуальный чат-бот с поддержкой голосового ввода, построенный на базе Next.js 15, OpenAI/Llama 3 и Framer Motion.
Проект ориентирован на высокую производительность, чистоту кода и отличный UX, адаптированный для мобильных устройств.
Есть передача системного промпта и контекста последних 10 сообщений.

DEMO HERE: https://react-voice-ai-chat.vercel.app/

## 🌟 Основные возможности

- Voice-to-Text: Транскрибация аудио в реальном времени (Whisper API).
- AI Intelligence: Интеграция с Llama 3.1 через Groq/OpenAI SDK.
- Optimistic UI: Мгновенное отображение сообщений в интерфейсе.
- Persistence: Сохранение истории переписки в localStorage.
- Modern UI: Адаптивный дизайн на Tailwind CSS с плавной анимацией.
- Robust Architecture: Четкое разделение на слои (Services, Hooks, Lib, UI).

## 🛠️ Технологический стек

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Shadcn UI
- Animation: Framer Motion
- State: Custom Hooks & Local Storage
- API: OpenAI SDK (Llama 3.1 model)

## 📁 Структура проекта

```bash
├── app/api/      # API Route Handlers (Backend)
├── components/   # Бизнес-компоненты
│   └── ui/       # Атомарные UI-компоненты (Shadcn)
├── hooks/        # Кастомные React хуки (useChat, useMedia, и т.д.)
├── services/     # Слой бизнес-логики (API клиенты)
├── lib/          # Утилиты и конфигурации (http-client, error-handler)
└── types/        # Глобальные определения типов
```

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Установка зависимостей

```bash
npm install
```

### 2. Настройте переменные окружения (скопируйте и переименуйте .env.example -> .env)

Можно создать копию командой в терминале

```bash
# Linux / macOS / Git Bash
cp .env.example .env
# В Windows (PowerShell)
copy .env.example .env
```

Фрагмент кода

```bash
OPENAI_API_KEY=your_api_key_here # Only GROG https://console.groq.com/keys
```

### 4. Запуск

```bash
# for develop
npm run dev
# or for build production
npm run build
```

## 🛡 Безопасность и архитектура

- Использование HOF (Higher-Order Functions) для централизованной обработки ошибок в API.
- Строгая типизация всех ответов сервера через Generics.
- Разделение ответственности между клиентской и серверной частями.

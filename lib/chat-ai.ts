import { answerFor, answerForPrompt } from "@/lib/chatbot-knowledge";
import { getChatSystemPrompt } from "@/lib/chatbot-system-prompt";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const MAX_HISTORY = 10;
const MAX_MESSAGE_CHARS = 1200;

function trimHistory(history: ChatTurn[]): ChatTurn[] {
  return history.slice(-MAX_HISTORY).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_MESSAGE_CHARS)
  }));
}

async function callGroq(systemPrompt: string, history: ChatTurn[]): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) return null;

  const model = process.env.GROQ_MODEL?.trim() || "llama-3.1-8b-instant";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 400,
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content
        }))
      ]
    }),
    signal: AbortSignal.timeout(18_000)
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const text = data.choices?.[0]?.message?.content?.trim();
  return text || null;
}

async function callGemini(systemPrompt: string, history: ChatTurn[]): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      })),
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 400
      }
    }),
    signal: AbortSignal.timeout(18_000)
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("").trim();
  return text || null;
}

export type ChatReplyResult = {
  reply: string;
  source: "groq" | "gemini" | "rules";
};

export async function generateChatReply(
  userMessage: string,
  history: ChatTurn[],
  promptId?: string
): Promise<ChatReplyResult> {
  const fallback = promptId ? answerForPrompt(promptId) : answerFor(userMessage);
  const systemPrompt = getChatSystemPrompt();
  const turns = trimHistory([
    ...history,
    { role: "user" as const, content: userMessage.slice(0, MAX_MESSAGE_CHARS) }
  ]);

  try {
    const groq = await callGroq(systemPrompt, turns);
    if (groq) return { reply: groq, source: "groq" };

    const gemini = await callGemini(systemPrompt, turns);
    if (gemini) return { reply: gemini, source: "gemini" };
  } catch {
    /* use rules fallback */
  }

  return { reply: fallback, source: "rules" };
}

export function hasAiProviderConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim());
}

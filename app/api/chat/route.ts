import { NextResponse } from "next/server";
import { generateChatReply, type ChatTurn } from "@/lib/chat-ai";

export const runtime = "nodejs";

type ChatRequestBody = {
  message?: string;
  promptId?: string;
  history?: { role?: string; text?: string }[];
};

function parseHistory(raw: ChatRequestBody["history"]): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: ChatTurn[] = [];
  for (const m of raw) {
    if (!m || (m.role !== "user" && m.role !== "bot") || typeof m.text !== "string") continue;
    const content = m.text.trim().slice(0, 1200);
    if (!content) continue;
    turns.push({ role: m.role === "bot" ? "assistant" : "user", content });
  }
  return turns;
}

export async function POST(request: Request) {
  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message || message.length > 1200) {
    return NextResponse.json({ error: "Message required (max 1200 chars)" }, { status: 400 });
  }

  const history = parseHistory(body.history);
  const promptId = typeof body.promptId === "string" ? body.promptId : undefined;

  const result = await generateChatReply(message, history, promptId);

  return NextResponse.json({
    reply: result.reply,
    source: result.source
  });
}

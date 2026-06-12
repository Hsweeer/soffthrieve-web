"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { CHAT_PROMPTS, answerFor, answerForPrompt } from "@/lib/chatbot-knowledge";
import { AssistantLottie } from "@/components/AssistantLottie";
import { localePath, useDictionary } from "@/lib/i18n";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const WELCOME_EN = "Ask about mobile apps, web platforms, or Shopify — or start a project brief.";

function TypingIndicator({ label }: { label: string }) {
  return (
    <div className="assistant-msg assistant-msg--bot">
      <div className="assistant-typing" aria-label={label}>
        <span className="assistant-typing__dot" />
        <span className="assistant-typing__dot" />
        <span className="assistant-typing__dot" />
      </div>
    </div>
  );
}

export function Chatbot() {
  const { dict, locale } = useDictionary();
  const welcomeText = locale === "ar" ? dict.chatbot.welcome : WELCOME_EN;

  const [botVisible, setBotVisible] = useState(false);
  const [botDismissed, setBotDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "welcome", role: "bot", text: welcomeText }
  ]);
  const [usedPromptIds, setUsedPromptIds] = useState<Set<string>>(() => new Set());
  const listRef = useRef<HTMLDivElement>(null);

  const visiblePrompts = CHAT_PROMPTS.filter((p) => !usedPromptIds.has(p.id));
  const showPrompts = visiblePrompts.length > 0 && !typing;

  useEffect(() => {
    setMessages((current) =>
      current.map((m) => (m.id === "welcome" ? { ...m, text: welcomeText } : m))
    );
  }, [welcomeText]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (scrollTop <= 0 && botDismissed) {
        setBotDismissed(false);
      }

      if (botDismissed || open) return;
      setBotVisible(scrollPercent > 2);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [botDismissed, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function openChat() {
    setUsedPromptIds(new Set());
    setMessages([{ id: "welcome", role: "bot", text: welcomeText }]);
    setInput("");
    setTyping(false);
    setOpen(true);
  }

  function closeChat() {
    setOpen(false);
  }

  async function fetchBotReply(clean: string, promptId?: string) {
    const history = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({
        role: m.role === "bot" ? ("bot" as const) : ("user" as const),
        text: m.text
      }));

    let replyText = promptId ? answerForPrompt(promptId) : answerFor(clean);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, promptId, history })
      });

      if (res.ok) {
        const data = (await res.json()) as { reply?: string };
        if (data.reply?.trim()) replyText = data.reply.trim();
      }
    } catch {
      /* rules fallback already set */
    }

    setMessages((current) => [
      ...current,
      { id: `bot-${Date.now()}`, role: "bot", text: replyText }
    ]);
    setTyping(false);
  }

  function send(text = input, promptId?: string) {
    const clean = text.trim();
    if (!clean || typing) return;

    if (
      clean.toLowerCase().includes("start a project") ||
      clean.includes("بدء مشروع") ||
      promptId === "start"
    ) {
      window.location.href = localePath("/start", locale);
      return;
    }

    setInput("");
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", text: clean }]);
    setTyping(true);
    void fetchBotReply(clean, promptId);
  }

  function handlePromptClick(prompt: (typeof CHAT_PROMPTS)[number]) {
    setUsedPromptIds((prev) => new Set(prev).add(prompt.id));
    send(prompt.label, prompt.id);
  }

  function handleCloseBot() {
    setBotVisible(false);
    setBotDismissed(true);
    closeChat();
  }

  const showLauncher = botVisible || open;

  return (
    <>
      <motion.div
        animate={showLauncher ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        className={clsx("contact-bot", open && "contact-bot-chat-open")}
        id="softthrive-assistant"
        initial={false}
        style={{ pointerEvents: showLauncher ? "auto" : "none" }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        {!open && (
          <button
            aria-label="Dismiss assistant"
            className="assistant-close"
            onClick={handleCloseBot}
            type="button"
          >
                <X className="h-3 w-3 text-white/90" strokeWidth={2.25} />
          </button>
        )}

        <AssistantLottie className="contact-bot-lottie" onClick={openChat} />
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              animate={{ opacity: 1 }}
              aria-label={dict.aria.closeChat}
              className="assistant-chat-backdrop"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeChat}
              transition={{ duration: 0.2 }}
              type="button"
            />
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              aria-label={dict.aria.openAssistant}
              aria-modal="true"
              className="assistant-chat-panel"
              exit={{ opacity: 0, y: 12 }}
              initial={{ opacity: 0, y: 16 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="assistant-chat-header">
                <div className="assistant-chat-header__icon" aria-hidden>
                  <MessageCircle className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="assistant-chat-header__title">{dict.chatbot.title}</p>
                  <p className="assistant-chat-header__subtitle">{dict.chatbot.subtitle}</p>
                </div>
                <button
                  aria-label={dict.aria.closeChat}
                  className="assistant-close assistant-close--inline assistant-close--panel"
                  onClick={closeChat}
                  type="button"
                >
                  <X className="h-4 w-4 text-white/95" strokeWidth={2.25} />
                </button>
              </header>

            <div className="assistant-chat-body" ref={listRef}>
              <div className="assistant-chat-messages">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className={clsx(
                        "assistant-msg",
                        message.role === "user" ? "assistant-msg--user" : "assistant-msg--bot"
                      )}
                      initial={{ opacity: 0, y: 6 }}
                      key={message.id}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="assistant-msg__bubble">{message.text}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <AnimatePresence>{typing && <TypingIndicator key="typing" label={dict.chatbot.typing} />}</AnimatePresence>
              </div>

              <AnimatePresence>
                {showPrompts && (
                  <motion.div
                    animate={{ opacity: 1, height: "auto" }}
                    className="assistant-chat-prompts"
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0 }}
                  >
                    <p className="assistant-chat-prompts__label">{dict.chatbot.suggested}</p>
                    <div className="assistant-chat-prompts__list">
                      {visiblePrompts.map((prompt) => (
                        <button
                          className="assistant-prompt-chip"
                          key={prompt.id}
                          onClick={() => handlePromptClick(prompt)}
                          type="button"
                        >
                          {prompt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <footer className="assistant-chat-footer">
              <form
                className="assistant-chat-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <input
                  className="assistant-chat-input"
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.chatbot.placeholder}
                  value={input}
                />
                <button aria-label="Send message" className="assistant-chat-send" type="submit">
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <div className="assistant-chat-actions">
                <Link className="assistant-chat-cta" href={localePath("/start", locale)}>
                  {dict.chatbot.beginProject}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link className="assistant-chat-cta-secondary" href={localePath("/contact", locale)}>
                  {dict.chatbot.getQuote}
                </Link>
              </div>
            </footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

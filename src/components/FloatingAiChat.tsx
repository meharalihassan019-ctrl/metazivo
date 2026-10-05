import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  RotateCcw, 
  ArrowUpRight,
  User,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  "🚀 What services does Metazivo provide?",
  "💰 How much does a custom website cost?",
  "🔍 How does your SEO & AEO service work?",
  "📱 Can you build iOS & Android mobile apps?",
  "📞 How can I talk to Mehar Ali Hassan?"
];

function FormattedMessage({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");

  return (
    <div className="space-y-2 leading-relaxed">
      {paragraphs.map((para, pIdx) => {
        // Check for code blocks
        if (para.includes("```")) {
          const parts = para.split(/(```[\s\S]*?```)/g);
          return (
            <div key={pIdx} className="space-y-1.5">
              {parts.map((part, partIdx) => {
                if (part.startsWith("```") && part.endsWith("```")) {
                  const codeLines = part.slice(3, -3).trim().split("\n");
                  const lang = codeLines[0].length < 15 && !codeLines[0].includes(" ") ? codeLines[0] : "";
                  const code = lang ? codeLines.slice(1).join("\n") : codeLines.join("\n");
                  return (
                    <pre key={partIdx} className="bg-slate-900 text-slate-100 p-2.5 rounded-xl font-mono text-[11px] overflow-x-auto my-1 border border-slate-800">
                      <code>{code}</code>
                    </pre>
                  );
                }
                return <p key={partIdx}>{part}</p>;
              })}
            </div>
          );
        }

        const lines = para.split("\n");
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
              const cleanLine = isBullet ? line.trim().slice(2) : line;
              const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

              return (
                <div key={lIdx} className={isBullet ? "flex items-start gap-1.5 pl-1" : ""}>
                  {isBullet && <span className="text-[#FF5722] font-bold text-sm leading-none shrink-0 mt-0.5">•</span>}
                  <span>
                    {parts.map((part, partIdx) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={partIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function FloatingAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      text: "Hello! 👋 I'm Metazivo's AI Assistant. How can I help you today? Feel free to ask about our SEO ranking services, WordPress development, custom web apps, mobile apps, or pricing (in English or Roman Urdu)!",
      timestamp: "Just now"
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build clean conversation history for API (filter out any previous error messages)
      const conversationHistory = [...messages, userMsg]
        .filter((m) => !m.text.includes("rukawat aayi") && !m.text.includes("network connection"))
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          content: m.text
        }));

      let botReply = "";

      // Try primary API endpoint
      try {
        const res = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageText,
            messages: conversationHistory
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.text) {
            botReply = data.text;
          }
        }
      } catch (primaryNetErr) {
        console.warn("Primary chat endpoint attempt failed:", primaryNetErr);
      }

      // If primary endpoint didn't return text, try backup /api/chat endpoint
      if (!botReply) {
        try {
          const fallbackRes = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: messageText,
              messages: conversationHistory
            })
          });

          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            if (fallbackData && fallbackData.text) {
              botReply = fallbackData.text;
            }
          }
        } catch (secondaryNetErr) {
          console.warn("Secondary chat endpoint attempt failed:", secondaryNetErr);
        }
      }

      if (!botReply) {
        throw new Error("Unable to obtain response from chat endpoints");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err) {
      console.warn("AI chat client fallback:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          text: "Maaf kijiye ga, request process nahi ho saki. Baraye meherbani ek bar phir apna sawal likhein ya 'Reset' button daba kar nayi chat shuru karein!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-welcome-reset",
        role: "assistant",
        text: "Chat cleared! How else can I assist your business today?",
        timestamp: "Just now"
      }
    ]);
  };

  const cleanPhone = "+923288518557";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi Metazivo! I was chatting with your AI assistant on your website and would like to discuss my project with Mehar Ali Hassan.`
  )}`;

  return (
    <>
      {/* Floating Action Button (Positioned right above WhatsApp button) */}
      <div className="fixed bottom-22 right-6 z-40">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center justify-center p-3.5 rounded-full shadow-[0_4px_20px_rgba(255,87,34,0.45)] hover:shadow-[0_6px_24px_rgba(255,87,34,0.65)] transition-all hover:scale-110 active:scale-95 group cursor-pointer relative ${
            isOpen 
              ? "bg-slate-900 text-white border border-slate-700" 
              : "bg-gradient-to-tr from-[#FF5722] to-[#FF7043] text-white"
          }`}
          title="Chat with Metazivo AI Assistant"
          aria-label="Toggle Metazivo AI Chat"
        >
          {/* Subtle Breathing Pulse Effect when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#FF5722]/40 animate-ping opacity-60 pointer-events-none group-hover:opacity-0 transition-opacity" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 fill-current relative z-10" />
              {/* Unread badge dot */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-20 shadow-xs" />
              )}
            </>
          )}

          {/* Floating Hover Tooltip */}
          <span className="absolute right-16 bg-slate-900 text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-800">
            {isOpen ? "Close Assistant" : "Chat with Metazivo AI"}
          </span>
        </button>
      </div>

      {/* Interactive AI Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 sm:bottom-26 right-4 sm:right-6 w-[94vw] sm:w-[390px] h-[550px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 flex flex-col overflow-hidden animate-fade-in text-slate-800"
          role="dialog"
          aria-label="Metazivo AI Assistant Chat Window"
        >
          {/* Top Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-neutral-900 text-white p-4 px-5 flex items-center justify-between border-b border-slate-800 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF5722] to-amber-500 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white leading-tight">Metazivo AI Assistant</h3>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-orange-500/20 text-[#FF5722] border border-orange-500/30 px-1.5 py-0.5 rounded">
                    Google Gemini
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Instant Answers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Messages Scroll View */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-orange-100 text-[#FF5722] flex items-center justify-center shrink-0 mt-0.5 border border-orange-200/80 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 leading-relaxed space-y-1 shadow-2xs ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-[#FF5722] to-[#F4511E] text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <FormattedMessage text={m.text} />
                  ) : (
                    <p className="whitespace-pre-line text-xs font-normal selection:bg-orange-200">
                      {m.text}
                    </p>
                  )}
                  <div
                    className={`text-[9px] font-mono text-right ${
                      m.role === "user" ? "text-orange-100/80" : "text-slate-400"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex gap-2 items-center text-slate-500 text-xs pl-2 pt-1 animate-pulse">
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5722] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200/80 px-3 py-2 rounded-2xl shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-mono text-slate-500 ml-1">Thinking...</span>
                </div>
              </div>
            )}

            {/* Quick Suggestion Chips (when only initial message exists) */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
                  Common Client Inquiries:
                </span>
                <div className="flex flex-col gap-1.5">
                  {QUICK_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug.replace(/^[^\s]+\s*/, ""))}
                      className="text-left text-[11px] p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/60 text-slate-700 hover:text-[#FF5722] transition-colors shadow-2xs flex items-center justify-between group cursor-pointer"
                    >
                      <span>{sug}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#FF5722] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick WhatsApp Handoff Strip */}
          <div className="px-4 py-2 bg-emerald-50/80 border-t border-emerald-100 flex items-center justify-between gap-2 text-[11px] shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Need custom pricing or live voice call?</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline cursor-pointer font-mono"
            >
              <span>WhatsApp Mehar</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything in English or Roman Urdu..."
              disabled={loading}
              className="flex-1 bg-slate-100/80 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all font-sans"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-2xl bg-[#FF5722] hover:bg-[#F4511E] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

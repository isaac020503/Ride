import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Sparkles, Bot, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Khotso, and welcome! I am **Morena Bot**, your expert guide to the Kingdom in the Sky. ⛰️🇱🇸\n\nHow can I help you plan your journey, discover our culture, or order traditional foods today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Map chat history so the API can consume it
      const historyPayload = messages
        .filter((msg) => msg.id !== "initial")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          text: msg.text,
        }));

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach Morena Bot on the server.");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const botErrMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: "Khotso, Morena. I encountered some mountain mist while contacting the spirits of Thaba Bosiu. Please connect again shortly, or ask me another question!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botErrMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggest = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const formatMessage = (text: string) => {
    // Basic formatting helper for simple markdown tags
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let formatted = line;
      
      // Handle bold tags: **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parsedBold: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(formatted)) !== null) {
        if (match.index > lastIndex) {
          parsedBold.push(formatted.substring(lastIndex, match.index));
        }
        parsedBold.push(<strong key={match.index} className="text-amber-400 font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < formatted.length) {
        parsedBold.push(formatted.substring(lastIndex));
      }

      const elements = parsedBold.length > 0 ? parsedBold : formatted;

      // Handle simple lists: - or *
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const cleanedStr = line.replace(/^[-*]\s+/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-gray-200 text-sm mb-1 leading-relaxed">
            {cleanedStr.includes("**") ? formatMessage(cleanedStr) : cleanedStr}
          </li>
        );
      }

      // Handle custom local symbols / headings
      if (line.trim().startsWith("### ")) {
        const cleanedStr = line.replace(/^###\s+/, "");
        return (
          <h4 key={idx} className="text-base font-bold text-violet-300 mt-3 mb-1 tracking-tight">
            {cleanedStr}
          </h4>
        );
      }
      
      if (line.trim().startsWith("## ")) {
        const cleanedStr = line.replace(/^##\s+/, "");
        return (
          <h3 key={idx} className="text-lg font-extrabold text-[#b46cff] mt-4 mb-2 tracking-tight">
            {cleanedStr}
          </h3>
        );
      }

      return (
        <span key={idx} className="block text-sm text-gray-200 mb-1.5 leading-relaxed">
          {elements}
        </span>
      );
    });
  };

  const resetChat = () => {
    setMessages([
      {
        id: "initial",
        sender: "bot",
        text: "Khotso, and welcome again! I am **Morena Bot**, ready to guide you. How can I help you explore the Kingdom in the Sky today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Sparkle Action Button */}
      <motion.button
        id="applet-ai-chatbot-toggle"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-110 active:scale-95 transition-transform duration-200 border border-violet-400/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{
          boxShadow: "0 0 30px rgba(139,92,246,0.6)",
        }}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </motion.button>

      {/* Slide-In Chat Container with Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="applet-ai-chatbot-window"
            className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[550px] rounded-2xl bg-black/95 border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden backdrop-blur-md"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-950/45 to-black border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-violet-600/25 rounded-xl border border-violet-500/20">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-1">
                    Morena <span className="text-violet-400 font-extrabold uppercase text-[10px] bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/10">Bot</span>
                  </h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Highland Local Guide
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-90 transition-transform"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-90 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat message output stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-violet-600/90 text-white rounded-tr-none shadow-[0_4px_12px_rgba(139,92,246,0.15)]"
                        : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {formatMessage(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-2.5 rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                    <span className="text-xs text-gray-400 animate-pulse">Crossing Sani Pass...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* AI Prompts Prompt-suggest list */}
            <div className="px-3 py-1.5 bg-black/40 border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none whitespace-nowrap">
              <button
                onClick={() => handleSuggest("Suggest a 3-day adventure itinerary for Lesotho.")}
                className="text-[11px] bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/20 text-gray-300 rounded-full px-3 py-1 border border-white/5 font-medium transition-all"
              >
                🎒 3-Day Itinerary
              </button>
              <button
                onClick={() => handleSuggest("What traditional foods should I buy in the marketplace?")}
                className="text-[11px] bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/20 text-gray-300 rounded-full px-3 py-1 border border-white/5 font-medium transition-all"
              >
                🍲 Traditional Foods
              </button>
              <button
                onClick={() => handleSuggest("Tell me about King Moshoeshoe I and Thaba Bosiu fortress.")}
                className="text-[11px] bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/20 text-gray-300 rounded-full px-3 py-1 border border-white/5 font-medium transition-all"
              >
                🏰 History of Moshoeshoe
              </button>
              <button
                onClick={() => handleSuggest("Why is Lesotho called Southern Africa's Water Tower?")}
                className="text-[11px] bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/20 text-gray-300 rounded-full px-3 py-1 border border-white/5 font-medium transition-all"
              >
                💧 Water Tower
              </button>
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-black/60 border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about mountains, food, culture..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500/40 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2 h-10 w-10 bg-violet-600 hover:bg-violet-500 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:bg-white/5 disabled:text-gray-500 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

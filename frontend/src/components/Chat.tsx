import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  FiSend,
  FiCpu,
  FiUser,
} from "react-icons/fi";

type Message = {
  role: "user" | "ai";
  text: string;
  time: string;
};

const getTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

// Streaming animation
const streamText = async (
  text: string,
  callback: (chunk: string) => void
) => {
  let current = "";

  for (let i = 0; i < text.length; i++) {
    current += text[i];

    callback(current);

    await new Promise((res) =>
      setTimeout(res, 12)
    );
  }
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello 👋 I’m your AI productivity assistant. I can help you create, manage, and track tasks efficiently.",
      time: getTime(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(
    null
  );

  const user_id = 1;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      text: input,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;

    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(
        currentInput,
        user_id
      );

      // Add empty AI message first
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "",
          time: getTime(),
        },
      ]);

      // Stream text
      await streamText(res.response, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1].text =
            chunk;

          return updated;
        });
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
          time: getTime(),
        },
      ]);
    }

    setLoading(false);
  };

  // ENTER SEND
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0b0b] text-white">

      {/* HEADER */}
      <div className="border-b border-gray-800 px-6 py-4 backdrop-blur-xl bg-black/40 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-white to-gray-400 text-black flex items-center justify-center shadow-lg">
            <FiCpu size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              AI Productivity Assistant
            </h2>

            <p className="text-xs text-gray-400">
              Smart task management powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">

        <div className="max-w-4xl mx-auto space-y-6">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {/* AI AVATAR */}
              {msg.role === "ai" && (
                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-white to-gray-400 text-black flex items-center justify-center shrink-0 shadow-md">
                  <FiCpu size={18} />
                </div>
              )}

              {/* MESSAGE */}
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-5 py-4 shadow-lg transition-all ${
                  msg.role === "user"
                    ? "bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                    : "bg-[#171717] border border-gray-800 text-gray-100 rounded-bl-md"
                }`}
              >

                <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-[15px]">
                  {msg.text}
                </p>

                <span
                  className={`text-[11px] mt-3 block ${
                    msg.role === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {/* USER AVATAR */}
              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <FiUser size={18} />
                </div>
              )}
            </div>
          ))}

          {/* TYPING */}
          {loading && (
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-white to-gray-400 text-black flex items-center justify-center shrink-0">
                <FiCpu size={18} />
              </div>

              <div className="bg-[#171717] border border-gray-800 rounded-3xl px-5 py-4 flex gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t border-gray-800 bg-black/50 backdrop-blur-xl px-4 md:px-8 py-5">

        <div className="max-w-4xl mx-auto flex items-center gap-3">

          <div className="flex-1 relative">

            <Input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask AI to create, manage, or update tasks..."
              className="h-14 rounded-2xl border-gray-800 bg-[#171717] text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700 pl-5 pr-14"
            />

          </div>

          <Button
            onClick={handleSend}
            disabled={loading}
            className="h-14 w-14 rounded-2xl bg-white hover:bg-gray-200 text-black shadow-lg transition-all"
          >
            <FiSend size={18} />
          </Button>

        </div>
      </div>
    </div>
  );
}
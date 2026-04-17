import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

// Simulated streaming effect
const streamText = async (
  text: string,
  callback: (chunk: string) => void
) => {
  let current = "";
  for (let i = 0; i < text.length; i++) {
    current += text[i];
    callback(current);
    await new Promise((res) => setTimeout(res, 15));
  }
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const user_id = 1;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: "user",
      text: input,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input, user_id);

      let aiText = "";

      // Add empty AI message first
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "", time: getTime() },
      ]);

      // Stream response text
      await streamText(res.response, (chunk) => {
        aiText = chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = aiText;
          return updated;
        });
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong",
          time: getTime(),
        },
      ]);
    }

    setLoading(false);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {/* AI Avatar */}
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                  AI
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`max-w-[70%] p-3 rounded-xl transition-all ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                <p>{msg.text}</p>

                <span className="text-xs opacity-70 block mt-1">
                  {msg.time}
                </span>
              </div>

              {/* User Avatar */}
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  U
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
              AI
            </div>

            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

import gsap from "gsap";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const user_id = 1;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await sendMessage(input, user_id);

      const aiMsg: Message = {
        role: "ai",
        text: res.response,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = { role: "ai", text: "Something went wrong" };
      setMessages((prev) => [
        ...prev,
        errorMsg,
      ]);
    }
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // GSAP animation
  useEffect(() => {
    gsap.from(".message", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.3,
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
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message max-w-[70%] p-3 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white border"
            }`}
          >
            {msg.text}
          </div>
        ))}
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
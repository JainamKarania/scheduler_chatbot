import { useState } from "react";
import { sendMessage } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Chat({onTaskCreated, }: {onTaskCreated?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const user_id = 1;

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input, user_id);

      const aiMessage: Message = {
        role: "ai",
        text: res.response,
      };

      if (onTaskCreated) {
  onTaskCreated();
}

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error connecting to AI" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI Scheduler</h1>

      <Card className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <p className="text-gray-500">Thinking...</p>}
      </Card>

      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";

export default function AIAssistant({ onSend }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Upload a document and tell me how you want it formatted.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // optimistic placeholder
    const thinkingMsg = { role: "assistant", content: "Thinking..." };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const aiResponse = await onSend?.(input);

      setMessages((prev) =>
        prev
          .slice(0, -1)
          .concat({ role: "assistant", content: aiResponse || "Done." })
      );
    } catch (err) {
      setMessages((prev) =>
        prev
          .slice(0, -1)
          .concat({
            role: "assistant",
            content: "Something went wrong. Please try again.",
          })
      );
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white">
      {/* Header */}
      <div className="border-b px-4 py-3 font-semibold text-gray-700">
        AI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your instruction..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 text-sm leading-relaxed
          ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

export default function AIAssistant({ onSend, disabled = false }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Upload a document and tell me how you want it formatted.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || disabled) return;

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
    <div className="flex flex-col bg-white/40 border border-purple-500 h-175 mt-4">
      {/* Header */}
      <div className="border-b border-purple-500 px-4 py-3 font-semibold text-gray-700">
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
      <div className="border-t border-purple-500 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your instruction..."
            className="flex-1 rounded-3xl border border-indigo-500 px-3 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={disabled}
            className="rounded-full h-12 w-12 bg-linear-to-br from-purple-600 via-indigo-600 to-pink-600 px-4 py-2 font-medium text-white hover:from-purple-600 hover:via-indigo-600 hover:to-pink-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faPaperPlane} />

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
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}

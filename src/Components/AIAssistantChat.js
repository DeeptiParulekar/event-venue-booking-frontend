import React, { useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import "./AIAssistantChat.css";

export default function AIAssistantChat({ role = "user" }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your AI Assistant! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // 👈 for showing/hiding chat box

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const endpoint = role === "admin" ? "/ai/admin" : "/ai/user";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const replyText = await res.text();
      setMessages((prev) => [...prev, { from: "bot", text: replyText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Sorry, I couldn’t fetch a response right now." },
      ]);
      console.error("AI Assistant Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button (like Tender247 “Ask Tender AI”) */}
      {!open && (
        <div className="ai-float-button" onClick={() => setOpen(true)}>
          <div className="ai-float-icon">
            <MessageCircle size={20} />
          </div>
          <span className="ai-float-text">Ask MyVenue</span>
        </div>
      )}

      {/* Chat Box */}
      {open && (
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              💬 Event Venue Assistant 
            </div>
            <button className="ai-close-btn" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ai-message ${
                  msg.from === "user" ? "ai-user-msg" : "ai-bot-msg"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className="ai-bot-msg">⌛ Thinking...</div>}
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

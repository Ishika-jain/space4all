import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WbSunny from "@mui/icons-material/WbSunny";
import RocketIcon from '@mui/icons-material/Rocket';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';


export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🌞 Hi! I’m your Space Weather Chatbot — ask me anything about weather, stars, or space!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a friendly and knowledgeable chatbot that explains Space Weather concepts simply.",
            },
            ...newMessages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
        },
        {
          headers: {
            Authorization: `Bearer `,
          },
        }
      );

      const botReply = res.data.choices[0].message.content.trim();
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("ChatGPT API Error:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t connect to API right now." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          background: "white",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          fontSize: "28px",
          zIndex: 9999,
        }}
        title="Chat with SolarBot"
      >
        {isOpen ? <div style={{ color: "black" }}>✖</div> : <RocketIcon size={80} sx={{ color: "#ff9800" }} />}
      </button>

      {/* Popup Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "25px",
            width: "350px",
            height: "450px",
            background: "linear-gradient(180deg, #000814, #001d3d)",
            color: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#003566",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            🪐 Space Weather Chatbot
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  margin: "8px 0",
                  textAlign: m.sender === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: m.sender === "user" ? "#007bff" : "#222",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    maxWidth: "75%",
                    wordWrap: "break-word",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && <p style={{ color: "#ccc" }}>☀️ Generating answer...</p>}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Anything about Space Weather..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: loading ? "#555" : "#007bff",
                border: "none",
                padding: "0 16px",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

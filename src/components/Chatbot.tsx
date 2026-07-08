"use client";

import { useRef, useCallback, useState } from "react";
import Icon from "@/components/Icon";

function getFormattedTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

interface ChatMessage {
  id: number;
  type: "bot" | "user";
  text: string;
  time: string;
}

const QUICK_REPLIES = [
  { icon: "pills" as const, label: "Tanya Stok Obat", prompt: "Saya ingin menanyakan stok obat" },
  { icon: "user-md" as const, label: "Konsul Apoteker", prompt: "Saya ingin konsultasi dengan apoteker" },
  { icon: "clock" as const, label: "Jam Operasional", prompt: "Jam operasional dan alamat toko" },
  { icon: "shopping-bag" as const, label: "Cara Order", prompt: "Bagaimana cara order obat?" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      type: "bot",
      text: `Halo! Selamat datang di <strong>Apotek Raja Farma</strong>. Saya <strong>RajaBot</strong>, asisten virtual AI Anda. 💊<br/><br/>Ada yang bisa saya bantu hari ini? Silakan pilih opsi di bawah ini atau ketik pertanyaan Anda.`,
      time: "Baru saja",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const msgIdRef = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  const addMessage = useCallback(
    (type: "bot" | "user", text: string) => {
      const id = msgIdRef.current++;
      setMessages((prev) => [...prev, { id, type, text, time: getFormattedTime() }]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  const callGroqAPI = useCallback(
    async (userMessage: string) => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: userMessage }],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        // Read the stream
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
        }

        // Add the bot response
        addMessage("bot", fullText);
      } catch (err) {
        addMessage("bot", `Maaf, terjadi kesalahan. Silakan coba lagi nanti. <br/><br/>Jika perlu bantuan segera, hubungi WhatsApp kami di <strong>+62 857-2224-4783</strong>.`);
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    },
    [addMessage, scrollToBottom],
  );

  const handleSend = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      const text = inputValue;
      addMessage("user", text);
      setInputValue("");
      callGroqAPI(text);
    },
    [inputValue, addMessage, callGroqAPI],
  );

  const handleQuickReply = useCallback(
    (prompt: string) => {
      addMessage("user", prompt);
      callGroqAPI(prompt);
    },
    [addMessage, callGroqAPI],
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      className="chat-widget"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {/* Chat Window */}
      <div
        className={`chat-window ${isOpen ? "active" : ""}`}
        style={{
          width: "380px",
          height: "520px",
          background: "var(--glass-bg)",
          backdropFilter: "var(--glass-blur)",
          border: "1px solid var(--glass-border)",
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--box-shadow-lg)",
          display: "flex",
          flexDirection: "column",
          marginBottom: "12px",
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div
          className="chat-header"
          style={{
            background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
            color: "var(--bg-white)",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="chat-bot-profile" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="bot-avatar"
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                position: "relative",
              }}
            >
              <Icon name="robot" size={20} color="white" />
              <span
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  border: "2px solid var(--primary-color)",
                }}
              />
            </div>
            <div>
              <h4 style={{ fontSize: "0.9375rem", color: "var(--bg-white)" }}>RajaBot AI</h4>
              <p style={{ fontSize: "0.75rem", opacity: 0.85, display: "flex", alignItems: "center", gap: "4px" }}>
                <Icon name="circle" size={8} color="#10b981" /> Online • Asisten Apotek
              </p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="chat-minimize"
            aria-label="Kecilkan Chat"
            style={{
              color: "var(--bg-white)",
              cursor: "pointer",
              fontSize: "1.125rem",
              opacity: 0.8,
              background: "none",
              border: "none",
            }}
          >
            <Icon name="minus" size={16} color="white" />
          </button>
        </div>

        {/* Messages */}
        <div
          className="chat-messages"
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.type === "bot" ? "bot-message" : "user-message"}`}
              style={{
                maxWidth: "80%",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                alignSelf: msg.type === "bot" ? "flex-start" : "flex-end",
              }}
            >
              <div
                className="msg-content"
                style={{
                  padding: "12px 16px",
                  borderRadius: "var(--border-radius-md)",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  backgroundColor: msg.type === "bot" ? "var(--bg-light)" : "var(--primary-color)",
                  color: msg.type === "bot" ? "var(--text-color)" : "var(--bg-white)",
                  borderBottomLeftRadius: msg.type === "bot" ? "4px" : "var(--border-radius-md)",
                  borderBottomRightRadius: msg.type === "user" ? "4px" : "var(--border-radius-md)",
                  boxShadow: msg.type === "bot" ? "0 2px 4px rgba(0,0,0,0.02)" : "0 2px 8px rgba(13, 148, 136, 0.15)",
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
              <span
                className="msg-time"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  alignSelf: msg.type === "bot" ? "flex-end" : "flex-start",
                }}
              >
                {msg.time}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="message bot-message" style={{ maxWidth: "80%", alignSelf: "flex-start" }}>
              <div
                className="msg-content"
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--border-radius-md)",
                  backgroundColor: "var(--bg-light)",
                  display: "inline-flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <span
                  className="typing-dot"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "var(--text-muted)",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite ease-in-out",
                  }}
                />
                <span
                  className="typing-dot"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "var(--text-muted)",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite ease-in-out",
                    animationDelay: "0.2s",
                  }}
                />
                <span
                  className="typing-dot"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "var(--text-muted)",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite ease-in-out",
                    animationDelay: "0.4s",
                  }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div
          className="chat-quick-replies"
          style={{
            padding: "0 24px 16px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {QUICK_REPLIES.map((qr) => (
            <button
              key={qr.label}
              onClick={() => handleQuickReply(qr.prompt)}
              className="quick-reply-btn"
              style={{
                backgroundColor: "var(--bg-white)",
                color: "var(--primary-color)",
                border: "1px solid rgba(13, 148, 136, 0.15)",
                padding: "8px 14px",
                borderRadius: "50px",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Icon name={qr.icon} size={14} color="var(--primary-color)" /> {qr.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          className="chat-input-area"
          onSubmit={handleSend}
          style={{
            padding: "16px 24px",
            backgroundColor: "var(--bg-white)",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            gap: "12px",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ketik pesan di sini..."
            autoComplete="off"
            style={{
              flex: 1,
              padding: "10px 16px",
              backgroundColor: "var(--bg-light)",
              borderRadius: "var(--border-radius-md)",
              fontSize: "0.875rem",
              border: "none",
              outline: "none",
              fontFamily: "'Poppins', sans-serif",
            }}
          />
          <button
            type="submit"
            className="btn-chat-send"
            aria-label="Kirim Pesan"
            disabled={isLoading || !inputValue.trim()}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--border-radius-md)",
              backgroundColor: "var(--primary-color)",
              color: "var(--bg-white)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              opacity: isLoading || !inputValue.trim() ? 0.6 : 1,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Icon name="paper-plane" size={16} color="white" />
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        id="btn-chat-toggle"
        onClick={toggleChat}
        className={`chat-toggle ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? "Tutup Chatbot" : "Buka Chatbot RajaBot"}
        style={{
          width: "64px",
          height: "64px",
          background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
          borderRadius: "50%",
          color: "var(--bg-white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.75rem",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(13, 148, 136, 0.4)",
          position: "relative",
          border: "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {!isOpen && (
          <span
            className="pulse-ring"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid var(--primary-color)",
              top: 0,
              left: 0,
              animation: "pulse 2s infinite",
              pointerEvents: "none",
            }}
          />
        )}
        <Icon name="comment-dots" size={28} color="white" style={{ display: isOpen ? "none" : "block" }} />
        <Icon name="times" size={24} color="white" style={{ display: isOpen ? "block" : "none" }} />
      </button>
    </div>
  );
}

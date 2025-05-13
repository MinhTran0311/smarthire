import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { ChatMessage } from "@/backend/services/chat/chat";
import ReactMarkdown from "react-markdown";

interface ChatBotProps {
  candidateInfo: string;
  jobDescription: string;
}

export default function ChatBot({
  candidateInfo,
  jobDescription,
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          candidateInfo,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Fab
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
            boxShadow: 4,
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {isOpen && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 40,
            right: 40,
            width: 520,
            height: 720,
            zIndex: 1200,
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            boxShadow: 8,
            overflow: "hidden",
            background: "#fafdff",
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              minHeight: 56,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 24 }}>
              Match Analysis Chat
            </Typography>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{ color: "white" }}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              background: "#fafdff",
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    px: 3,
                    borderRadius: 3,
                    bgcolor:
                      message.role === "user" ? "primary.light" : "grey.100",
                    color: message.role === "user" ? "white" : "text.primary",
                    fontSize: 18,
                  }}
                >
                  {message.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => (
                          <Typography
                            variant="body1"
                            sx={{ fontSize: 18, whiteSpace: "pre-line" }}
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li style={{ fontSize: 18 }} {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            style={{
                              background: "#eee",
                              borderRadius: 4,
                              padding: "2px 4px",
                              fontSize: 16,
                            }}
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ fontSize: 18, whiteSpace: "pre-line" }}
                    >
                      {message.content}
                    </Typography>
                  )}
                </Paper>
              </Box>
            ))}
            {isLoading && (
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "center",
                  color: "text.secondary",
                  fontSize: 18,
                }}
              >
                Thinking...
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 3,
              borderTop: 1,
              borderColor: "divider",
              background: "#fafdff",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask about the match..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              InputProps={{
                sx: { borderRadius: 3, background: "white", fontSize: 18 },
                endAdornment: (
                  <IconButton onClick={handleSend} disabled={isLoading}>
                    <SendIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                ),
              }}
              inputProps={{ style: { fontSize: 18 } }}
            />
          </Box>
        </Paper>
      )}
    </>
  );
}

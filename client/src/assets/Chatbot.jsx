import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! I'm your JobSync assistant. How can I help you today?"
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages(prev => [...prev, newMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/generate", {
        prompt: userInput
      });

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: response.data.text }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I encountered an error. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mt-4 mb-4"
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            {/* Chat Header */}
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex align-items-center">
                <FaRobot className="me-2" size={24} />
                <h5 className="mb-0">JobSync Assistant</h5>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              className="card-body" 
              style={{ 
                height: "500px", 
                overflowY: "auto",
                backgroundColor: "#f8f9fa"
              }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`d-flex ${
                    msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                  } mb-3`}
                >
                  <div
                    className={`d-flex align-items-start ${
                      msg.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`rounded-circle p-2 ${
                        msg.sender === "user" ? "bg-primary" : "bg-secondary"
                      } text-white me-2`}
                      style={{ width: 35, height: 35 }}
                    >
                      {msg.sender === "user" ? (
                        <FaUser size={16} />
                      ) : (
                        <FaRobot size={16} />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-3 ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                      style={{ maxWidth: "75%", wordWrap: "break-word" }}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="bg-white border p-3 rounded-3">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="card-footer border-top-0 bg-white">
              <div className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                  style={{ resize: "none" }}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSendMessage}
                  disabled={loading || !userInput.trim()}
                >
                  <FaPaperPlane />
                </button>
              </div>
              <small className="text-muted mt-2 d-block">
                Press Enter to send, Shift + Enter for new line
              </small>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          gap: 4px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: #90949c;
          border-radius: 50%;
          animation: bounce 1.3s ease infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Chatbot;

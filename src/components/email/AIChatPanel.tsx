import React, { useEffect, useRef, useState } from "react";
import { Bot, FileText, MoveUp, PanelLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "../ui/textarea";

const AIChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("ai-copilot");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [aiInput]);

  const handleInputChange = (e) => {
    setAiInput(e.target.value);
  };

  const handleAIMessage = () => {
    if (!aiInput.trim()) return;

    setIsSending(true);

    const newUserMessage = {
      id: Date.now(),
      type: "user",
      text: aiInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setAiInput("");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        text: "The customer qualifies for a full refund since the product is unopened. Should I draft a reply?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsSending(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAIMessage();
    }
  };

  const AIChatMessage = React.memo(({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-sm sm:max-w-md mx-auto mb-4 ${
        message.type === "user" ? "flex justify-end" : "flex justify-start"
      }`}
    >
      <div
        className={`flex items-start gap-2 sm:gap-3 max-w-full ${
          message.type === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium flex-shrink-0 ${
            message.type === "ai" ? "bg-black" : "bg-blue-500"
          }`}
        >
          {message.type === "ai" ? <Bot size={12} /> : "U"}
        </div>
        <div
          className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 rounded-lg ${
            message.type === "user"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="text-xs sm:text-sm whitespace-pre-line break-words">
            {message.text}
          </div>
          <div
            className={`text-xs mt-1 ${
              message.type === "user" ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {message.time}
          </div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center px-4 pt-6">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("ai-copilot")}
                className={`relative flex items-center space-x-2 text-xs font-medium pb-4 transition-colors ${
                  activeTab === "ai-copilot"
                    ? "text-purple-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                  <Bot size={10} className="text-white" />
                </div>
                <span>AI Copilot</span>
                {activeTab === "ai-copilot" && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-purple-700 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`relative flex items-center space-x-2 text-xs font-medium pb-4 transition-colors ${
                  activeTab === "details"
                    ? "text-purple-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>Details</span>
                {activeTab === "details" && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-purple-700 rounded-full" />
                )}
              </button>
            </div>

            <PanelLeft className="text-black mb-4" size={16} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-white/40 flex flex-col">
        {activeTab === "ai-copilot" && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                    <Bot size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Hi, I'm Fin AI Copilot
                  </h3>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Ask me anything about this conversation.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <AIChatMessage key={msg.id} message={msg} />
                  ))}
                  {isSending && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                          <Bot size={12} />
                        </div>
                        <div className="bg-gray-100 px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.6,
                                  delay,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} className="pb-4" />
                </>
              )}
            </div>

            <div className="px-4 py-3">
              {messages.length === 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setAiInput("How do I get a refund?")}
                      className="text-xs p-2 rounded-md bg-white shadow-sm text-gray-700 transition"
                    >
                      <span className="text-xs font-bold text-gray-700 mr-2">
                        Suggested
                      </span>
                      How do I get a refund?
                    </button>
                  </div>
                </div>
              )}

              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={aiInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="w-full resize-none px-4 py-3 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 overflow-hidden outline-none"
                  rows={1}
                  disabled={isSending}
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                />
                <button
                  onClick={handleAIMessage}
                  disabled={!aiInput.trim() || isSending}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <MoveUp size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "details" && (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <FileText size={40} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Details
              </h3>
              <p className="text-sm text-gray-600">No details available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatPanel;

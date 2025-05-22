
import React from "react";
import { motion } from "framer-motion";
import { AIMessage } from "@/types/chat";
import Avatar from "./Avatar";

interface AIChatMessageProps {
  message: AIMessage;
  isLast: boolean;
}

const AIChatMessage: React.FC<AIChatMessageProps> = ({ message, isLast }) => {
  const isAI = message.type === "ai";
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {isAI ? (
        <div className="flex items-start max-w-full w-full">
          <Avatar letter="AI" colorClass="bg-black text-white" size="sm" />
          <div className="ml-2 flex-1">
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium">Fin AI</span>
                <span className="text-xs text-gray-500 ml-2">Assistant</span>
              </div>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-gray-500 mt-1">{message.time}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[80%]">
          <p className="text-sm">{message.text}</p>
          <p className="text-xs mt-1 opacity-70">{message.time}</p>
        </div>
      )}
    </motion.div>
  );
};

export default AIChatMessage;

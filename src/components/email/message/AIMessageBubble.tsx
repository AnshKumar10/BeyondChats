import React, { useState } from "react";
import { motion } from "framer-motion";
import { AIMessage } from "@/types/chat";
import Avatar from "../Avatar";
import { Copy, MoreHorizontal, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIMessageBubbleProps {
  message: AIMessage;
}

const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({ message }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (message.type === "ai") {
    return (
      <div className="flex flex-col items-end mx-auto max-w-[90%]">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-1">Hi, I'm Fin AI Copilot</h3>
          <p className="text-sm text-gray-600">
            Ask me anything about this conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start max-w-[80%] group">
      <Avatar letter="AI" colorClass="bg-black text-white" size="sm" />
      <div className="ml-2 relative group">
        <motion.div
          className="bg-neutral-100 rounded-lg p-3"
          whileHover={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <p className="text-sm">{message.text}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
        </motion.div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 right-0 transition-opacity"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <MoreHorizontal size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(message.text);
                    toast("Text copied to clipboard");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Copy size={14} />
                    <span>Copy text</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => toast("Reply started")}
                >
                  <div className="flex items-center gap-2">
                    <Reply size={14} />
                    <span>Reply</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIMessageBubble;

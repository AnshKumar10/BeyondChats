
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, MoreHorizontal, Paperclip, Reply } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AIMessage } from "@/types/chat";
import Avatar from "../Avatar";

interface AssistantMessageBubbleProps {
  message: AIMessage;
}

const AssistantMessageBubble: React.FC<AssistantMessageBubbleProps> = ({ message }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex items-start max-w-[80%] group">
      <div className="mr-2 relative group">
        <motion.div 
          className="bg-blue-100 text-blue-800 rounded-lg p-3"
          whileHover={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <p className="text-sm">{message.text}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-blue-700">{message.sender} · {message.senderType}</span>
            <span className="text-xs text-gray-500 ml-4">{message.time}</span>
          </div>
        </motion.div>
        
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 left-0 transition-opacity"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-blue-200 rounded-full">
                  <MoreHorizontal size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                  navigator.clipboard.writeText(message.text);
                  toast("Text copied to clipboard");
                }}>
                  <div className="flex items-center gap-2">
                    <Copy size={14} />
                    <span>Copy text</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => toast("Reply started")}>
                  <div className="flex items-center gap-2">
                    <Reply size={14} />
                    <span>Reply</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => toast("Message forwarded")}>
                  <div className="flex items-center gap-2">
                    <Paperclip size={14} />
                    <span>Forward</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </div>
      <Avatar letter="A" colorClass="bg-blue-500 text-white" size="sm" />
    </div>
  );
};

export default AssistantMessageBubble;

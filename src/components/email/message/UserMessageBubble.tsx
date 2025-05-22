
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, MoreHorizontal, Paperclip, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AIMessage } from "@/types/chat";
import Avatar from "../Avatar";
import { bubbleVariants } from "./animation-variants";

interface UserMessageBubbleProps {
  message: AIMessage;
  avatarInfo: {
    letter: string;
    colorClass: string;
  };
}

const UserMessageBubble: React.FC<UserMessageBubbleProps> = ({ message, avatarInfo }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex items-start max-w-[80%] group">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer">
            <Avatar 
              letter={avatarInfo.letter} 
              colorClass={avatarInfo.colorClass} 
              size="sm"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-56">
          <div className="flex flex-col">
            <p className="font-medium">{message.sender || "User"}</p>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </HoverCardContent>
      </HoverCard>
      
      <div className="ml-2 relative group">
        <motion.div 
          className={`bg-gray-100 rounded-lg p-3 relative ${
            message.isSelected ? "bg-blue-100 border-2 border-blue-300" : ""
          }`}
          animate={{ 
            backgroundColor: message.isSelected ? "rgba(219, 234, 254, 1)" : "rgba(243, 244, 246, 1)",
            borderColor: message.isSelected ? "rgba(147, 197, 253, 1)" : "transparent"
          }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm">{message.text}</p>
          <div className="flex items-center justify-between mt-1">
            {message.tags && message.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-1">
                {message.tags.map((tag, index) => (
                  <motion.span 
                    key={index} 
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 ml-auto">{message.time}</p>
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
                <button className="p-1 hover:bg-gray-200 rounded-full">
                  <MoreHorizontal size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => toast("Marked as read")}>
                  <Check size={14} />
                  <span>Mark as read</span>
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
                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => toast("Message deleted")}>
                  <div className="flex items-center gap-2">
                    <Trash2 size={14} />
                    <span>Delete</span>
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

export default UserMessageBubble;

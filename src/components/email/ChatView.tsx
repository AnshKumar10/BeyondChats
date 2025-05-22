import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageSquare, Zap, Smile, Bookmark } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import Avatar from "./Avatar";

interface ChatViewProps {
  conversation: {
    id: number;
    name: string;
    company?: string;
  };
  onShowSidebar: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ conversation, onShowSidebar }) => {
  // Initial messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! How can I help you today?",
      sender: "support",
      time: "10:30 AM",
    },
    {
      id: 2,
      content: "I'm having an issue with my recent order.",
      sender: "customer",
      time: "10:32 AM",
    },
    {
      id: 3,
      content:
        "I'm sorry to hear that. Could you please provide me with your order number?",
      sender: "support",
      time: "10:34 AM",
    },
    {
      id: 4,
      content: "Sure, it's ORD-12345.",
      sender: "customer",
      time: "10:35 AM",
    },
    {
      id: 5,
      content:
        "Thank you. I can see your order and the issue. Let me help resolve this for you.",
      sender: "support",
      time: "10:38 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setIsSending(true);

    // Create the new message
    const newMsg: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "customer",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    setTimeout(() => {
      const replyMsg: Message = {
        id: messages.length + 2,
        content:
          "Thanks for your message. I'll look into this and get back to you shortly.",
        sender: "support",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, replyMsg]);
      setIsSending(false);
      toast.success("Message sent successfully");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Header
        title={`${conversation.name} ${
          conversation.company ? `· ${conversation.company}` : ""
        }`}
        onShowSidebar={onShowSidebar}
      />

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 pb-2">
          <AnimatePresence>
            {messages.map((message) => {
              const isCustomer = message.sender === "customer";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end ${
                    isCustomer ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar on left for agent */}
                  {!isCustomer && (
                    <div className="mr-2">
                      <Avatar
                        letter="A"
                        colorClass="bg-gray-300 text-gray-800"
                        size="sm"
                      />
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      isCustomer
                        ? "bg-indigo-200 text-black rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {message.time}
                    </p>
                  </div>

                  {/* Avatar on right for customer */}
                  {isCustomer && (
                    <div className="ml-2">
                      <Avatar
                        letter="U"
                        colorClass="bg-blue-500 text-white"
                        size="sm"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {isSending && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end justify-start"
              >
                <div className="mr-2">
                  <Avatar
                    letter="A"
                    colorClass="bg-gray-300 text-gray-800"
                    size="sm"
                  />
                </div>
                <div className="bg-gray-100 text-gray-800 max-w-[80%] p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="p-4">
        <div className="w-full border rounded-lg shadow-sm p-4 bg-white">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-sm font-medium text-black gap-1"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span className="mb-1">Chat</span>
              <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
            </Button>
          </div>

          <Textarea
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Use ⌘K for shortcuts"
            className="resize-none border-0 focus-visible:ring-0 text-sm text-gray-800 placeholder-gray-400 px-0"
          />

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-black" />
              <div className="h-4 border-black/20 border "></div>
              <Bookmark className="ml-1 w-4 h-4 text-black" />
              <Smile className="ml-3 w-4 h-4 text-black" />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSendMessage}
              className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-2"
            >
              <span>Send</span>
              <div className="h-4 border-black/20 border "></div>

              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

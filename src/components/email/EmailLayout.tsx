import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";
import ChatView from "./ChatView";
import AIChatPanel from "./AIChatPanel";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Luis",
    company: "Github",
    snippet: "Hey! I have a question about...",
    time: "45m",
    avatar: "L",
    avatarColor: "bg-blue-300",
    unread: false,
  },
  {
    id: 2,
    name: "Ivan",
    company: "Nike",
    snippet: "Hi there, I have a question...",
    time: "30m",
    avatar: "I",
    avatarColor: "bg-red-500",
    unread: true,
  },
  {
    id: 3,
    name: "Lead from New York",
    snippet: "Good morning, let me know...",
    time: "40m",
    avatar: "L",
    avatarColor: "bg-blue-300",
    unread: false,
  },
  {
    id: 4,
    name: "Luis",
    company: "Small Crafts",
    snippet: "Bug report",
    time: "45m",
    avatar: "B",
    avatarColor: "bg-neutral-900 text-white",
    unread: false,
  },
  {
    id: 5,
    name: "Miracle",
    company: "Exemplary Bank",
    snippet: "Hey there, I'm here to...",
    time: "48m",
    avatar: "M",
    avatarColor: "bg-neutral-200",
    unread: false,
  },
];

const EmailLayout: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    CONVERSATIONS[0]
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    // Animation delay to ensure smooth page load
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, []);

  const handleSelectConversation = (
    conversation: (typeof CONVERSATIONS)[0]
  ) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex"
          >
            {/* Sidebar - Conversation List */}
            <motion.div
              className={`${
                isMobile && !isMobileMenuOpen ? "hidden" : "block"
              } w-[300px] h-full relative `}
              animate={{
                width: isMobile ? (isMobileMenuOpen ? "100%" : "0") : "300px",
                opacity: isMobile ? (isMobileMenuOpen ? 1 : 0) : 1,
                display: isMobile && !isMobileMenuOpen ? "none" : "block",
              }}
              transition={{ duration: 0.2 }}
            >
              <Sidebar
                conversations={CONVERSATIONS}
                onSelectConversation={handleSelectConversation}
                selectedConversation={selectedConversation}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </motion.div>

            {/* Middle Column - Team Chat */}
            <motion.div
              className={`flex-1 ${
                isMobile && isMobileMenuOpen ? "hidden" : "block"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <ChatView
                conversation={selectedConversation}
                onShowSidebar={() => setIsMobileMenuOpen(true)}
              />
            </motion.div>

            {/* Third Column - Fin AI Chat */}
            <motion.div
              className={`w-[350px] ${
                isMobile ? "hidden" : "flex"
              } flex-col h-full`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <AIChatPanel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailLayout;

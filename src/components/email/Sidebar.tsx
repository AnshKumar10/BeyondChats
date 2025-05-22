import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  conversations: Array<{
    id: number;
    name: string;
    company?: string;
    snippet: string;
    time: string;
    avatar: string;
    avatarColor: string;
    unread: boolean;
  }>;
  onSelectConversation: (conversation: any) => void;
  selectedConversation: any;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar = ({
  conversations,
  onSelectConversation,
  selectedConversation,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <AnimatePresence>
      {(isMobileMenuOpen ||
        !window.matchMedia("(max-width: 768px)").matches) && (
        <motion.div
          className={cn(
            "w-full md:max-w-[320px] md:block bg-white flex-shrink-0",
            isMobileMenuOpen ? "fixed inset-0 z-50" : "hidden"
          )}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="py-2">
              <div className="flex justify-between items-center">
                <h1 className="px-4 mt-2 text-lg border-b w-full pb-3 font-semibold text-gray-900">
                  Your inbox
                </h1>
                {isMobileMenuOpen && (
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden text-gray-500 pr-3 hover:text-gray-700"
                  >
                    Close
                  </motion.button>
                )}
              </div>

              {/* Filter buttons */}
              <div className="flex items-center px-4 mt-2 space-x-2">
                <motion.button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center px-3 py-1 text-sm font-medium  text-black "
                >
                  5 Open
                  <motion.div
                    animate={{ rotate: filterOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-1"
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </motion.button>

                <motion.button className="flex items-center px-3 py-1 text-sm font-medium  text-black ">
                  Waiting longest
                  <ChevronDown size={14} className="ml-1" />
                </motion.button>
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <motion.div
                  key={convo.id}
                  onClick={() => onSelectConversation(convo)}
                  className={cn(
                    "flex items-start p-3 border-b m-2 pt-2 rounded-md border-gray-100 cursor-pointer transition-colors",
                    selectedConversation.id === convo.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-100"
                  )}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  whileTap={{ backgroundColor: "#f3f4f6" }}
                  layout
                >
                  <Avatar
                    letter={convo.avatar}
                    colorClass={convo.avatarColor}
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium truncate text-gray-900">
                        {convo.name}
                        {convo.company && (
                          <span className="text-gray-500">
                            {" "}
                            · {convo.company}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <div className="text-sm text-gray-600 truncate">
                        {convo.snippet}
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {convo.time}
                      </div>
                    </div>
                  </div>
                  {convo.unread && (
                    <motion.div
                      className="ml-2 text-xs rounded-full bg-yellow-200 font-bold py-0.5 px-2  flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      3 min
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

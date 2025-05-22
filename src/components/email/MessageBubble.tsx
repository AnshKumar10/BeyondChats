import { motion } from "framer-motion";
import { AIMessage } from "@/types/chat";
import UserMessageBubble from "./message/UserMessageBubble";
import AssistantMessageBubble from "./message/AssistantMessageBubble";
import AIMessageBubble from "./message/AIMessageBubble";
import ArticleMessageBubble from "./message/ArticleMessageBubble";
import { bubbleVariants } from "./message/animation-variants";

interface MessageBubbleProps {
  message: AIMessage;
  avatarInfo: {
    letter: string;
    colorClass: string;
  };
  isLast: boolean;
}

const MessageBubble = ({ message, avatarInfo, isLast }: MessageBubbleProps) => {
  const isAssistant = message.type === "assistant";
  const isAI = message.type === "ai";
  const isArticle = message.type === "article";
  const isUser = !isAssistant && !isAI && !isArticle;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={bubbleVariants}
      className={`flex mb-3 ${
        isAssistant || isAI ? "justify-end" : "justify-start"
      }`}
    >
      {isUser && (
        <UserMessageBubble message={message} avatarInfo={avatarInfo} />
      )}
      {isAssistant && <AssistantMessageBubble message={message} />}
      {isAI && !isArticle && <AIMessageBubble message={message} />}
      {isArticle && <ArticleMessageBubble message={message} />}
    </motion.div>
  );
};

export default MessageBubble;

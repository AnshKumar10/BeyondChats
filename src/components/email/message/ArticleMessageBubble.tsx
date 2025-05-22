
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AIMessage } from "@/types/chat";
import { toast } from "sonner";

interface ArticleMessageBubbleProps {
  message: AIMessage;
}

const ArticleMessageBubble: React.FC<ArticleMessageBubbleProps> = ({ message }) => {
  const [isComposing, setIsComposing] = useState(false);
  
  const handleAddToComposer = () => {
    setIsComposing(true);
    setTimeout(() => {
      setIsComposing(false);
      toast("Added to composer");
    }, 800);
  };
  
  return (
    <div className="flex items-start max-w-[80%] group w-full bg-white border rounded-lg p-4 shadow-sm">
      <div className="w-full">
        <div className="flex items-center mb-2">
          <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Public article</div>
          <div className="text-xs text-gray-500 ml-2">· {message.author} · {message.published}</div>
        </div>
        <h3 className="font-medium text-gray-900 mb-2">Getting a refund</h3>
        <p className="text-sm text-gray-700">{message.text}</p>
        <div className="mt-3">
          <Button 
            onClick={handleAddToComposer} 
            variant="outline" 
            className="w-full justify-center"
            disabled={isComposing}
          >
            {isComposing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-t-transparent border-black rounded-full"
              />
            ) : (
              <>Add to composer</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleMessageBubble;

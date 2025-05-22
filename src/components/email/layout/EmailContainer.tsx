import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

interface EmailContainerProps {
  children: React.ReactNode;
}

const EmailContainer: React.FC<EmailContainerProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Animation delay to ensure smooth page load
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, []);

  return (
    <div className="flex h-screen bg-[#dcd6ff] items-center justify-center">
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-7xl h-[96vh] bg-white rounded-xl shadow-xl flex overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};

export default EmailContainer;

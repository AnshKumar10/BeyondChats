import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AvatarProps {
  letter: string;
  colorClass: string;
  size?: "xs" | "sm" | "md" | "lg";
  online?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
}

const Avatar = ({
  letter,
  colorClass,
  size = "md",
  online,
  showTooltip = false,
  tooltipText,
}: AvatarProps) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-md",
    lg: "w-12 h-12 text-lg",
  };

  const avatarElement = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-full flex items-center justify-center flex-shrink-0 font-medium relative",
        colorClass,
        sizeClasses[size]
      )}
    >
      {letter}
      {online && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            size === "xs" ? "w-1.5 h-1.5" : "w-2.5 h-2.5",
            "bg-green-500"
          )}
        />
      )}
    </motion.div>
  );

  if (showTooltip && tooltipText) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{avatarElement}</TooltipTrigger>
        <TooltipContent className="bg-white text-gray-900 border z-50">
          <p className="text-xs">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return avatarElement;
};

export default Avatar;

import { Button } from "@/components/ui/button";
import { Menu, Ellipsis, PanelBottom, ArrowLeft, Moon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  onShowSidebar?: () => void;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onShowSidebar,
  showBackButton = false,
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="
    flex flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10 w-full md:flex-col md:items-start md:gap-3 md:px-6 lg:flex-row lg:items-center lg:gap-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left section: Menu + Title */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {isMobile && onShowSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={onShowSidebar}
          >
            {showBackButton ? <ArrowLeft size={20} /> : <Menu size={20} />}
          </Button>
        )}
        <h2 className="font-medium text-base md:text-lg text-gray-800">
          {title}
        </h2>
      </div>

      {/* Right section: Buttons aligned to the end */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="bg-gray-100 py-1.5 px-2 rounded-lg">
          <Ellipsis size={18} />
        </div>

        <div className="bg-gray-100 py-1.5 px-2 rounded-lg">
          <Moon size={18} />
        </div>

        <div className="w-max flex gap-2 py-1.5 px-3 rounded-lg bg-black text-white hover:bg-none">
          <PanelBottom size={16} className="mt-0.5" />
          <span className="text-sm">Close</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;

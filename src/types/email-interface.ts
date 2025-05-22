import { AIMessage } from "./chat";

export interface AvatarProps {
  letter: string;
  colorClass: string;
  size?: "xs" | "sm" | "md" | "lg";
  showTooltip?: boolean;
  tooltipText?: string;
}

export interface MessageBubbleProps {
  message: AIMessage;
  avatarInfo: {
    letter: string;
    colorClass: string;
  };
  isLast: boolean;
}

export interface MessageActionsProps {
  onReply?: () => void;
  onCopy?: () => void;
  onForward?: () => void;
  onDelete?: () => void;
  onFormat?: () => void;
  onRegenerate?: () => void;
  isAssistant?: boolean;
  isAI?: boolean;
}

export interface ConversationItemProps {
  conversation: ConversationItem;
  isSelected: boolean;
  onSelect: (conversation: ConversationItem) => void;
}

export interface ConversationItem {
  id: number;
  name: string;
  company?: string;
  snippet?: string;
  time?: string;
  avatar?: string;
  avatarColor?: string;
  unread?: boolean;
}

export interface EmailLayoutProps {
  conversations?: ConversationItem[];
}

export interface ChatViewProps {
  conversation: {
    id: number;
    name: string;
    company?: string;
  };
  onShowSidebar: () => void;
}

export interface SidebarProps {
  conversations: ConversationItem[];
  onSelectConversation: (conversation: ConversationItem) => void;
  selectedConversation: ConversationItem;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export interface HeaderProps {
  title: string;
  onShowSidebar?: () => void;
  showBackButton?: boolean;
}

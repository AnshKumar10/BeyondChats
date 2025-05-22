export interface Message {
  id: number;
  content: string;
  sender: string;
  time: string;
}

export interface ConversationParticipant {
  id: number;
  name: string;
  company?: string;
  avatar?: string;
  avatarColor?: string;
}

export interface AIMessage {
  id: number;
  type: "user" | "assistant" | "ai" | "article";
  text: string;
  time: string;
  sender?: string;
  senderType?: string;
  tags?: string[];
  author?: string;
  published?: string;
  isSelected?: boolean;
}

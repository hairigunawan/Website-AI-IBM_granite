export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}

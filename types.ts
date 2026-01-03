
export interface Message {
  id: string;
  text?: string;
  audioUrl?: string;
  type?: 'text' | 'audio';
  sender: 'operator' | 'user';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface VideoSlide {
  id: number;
  text: string[];
  duration: number;
}

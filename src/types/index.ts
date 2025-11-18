export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "fulfilled";
  requesterId: string;
  requesterName: string;
  createdAt: string;
  offeredBy?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  requestId: string;
}

export const CATEGORIES = [
  "Transportation",
  "Shopping",
  "Home Repair",
  "Pet Care",
  "Technology Help",
  "Moving Help",
  "Other"
] as const;

export interface Destination {
  id: string;
  name: string;
  category: "natural" | "cultural" | "adventure" | "historical";
  summary: string;
  description: string;
  history: string;
  activities: string[];
  travelInfo: string;
  weather: string;
  elevation: string;
  image: string;
  gallery: string[];
  lat: number;
  lng: number;
  featured?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  category: "meals" | "drinks" | "snacks" | "stews" | "vegetables";
  image: string;
  description: string;
  history: string;
  ingredients: string[];
  price: number;
  calories: number;
  rating: number;
  reviews: Array<{
    user: string;
    comment: string;
    rating: number;
  }>;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface FamousDiamond {
  id: string;
  name: string;
  carats: number;
  foundYear: string;
  value: string;
  mine: string;
  notes: string;
  image?: string;
  rank: number;
}

export interface TravelChecklistItem {
  id: string;
  task: string;
  category: "documents" | "clothing" | "gear" | "finances" | "health";
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

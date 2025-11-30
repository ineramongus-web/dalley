
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  stats?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export interface AIResponse {
  briefTitle: string;
  summary: string;
  recommendedServices: string[];
  estimatedTimeline: string;
  creativeDirection: string;
}

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  file_url: string;
  downloads: number;
  created_at: string;
  user_id: string;
  profiles?: UserProfile; // Joined data
}

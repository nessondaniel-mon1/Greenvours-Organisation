
export type Page = 'home' | 'experiences' | 'mission' | 'conservation' | 'relief' | 'involved' | 'blog' | 'contact' | 'tour-detail' | 'admin' | 'project-detail';

export interface Tour {
  id: number | string;
  title: string;
  region: string;
  activity: 'Hiking' | 'Birdwatching' | 'Cultural' | 'Wellness' | 'Wildlife';
  duration: number; // in days
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  price: number;
  imageUrl: string;
  description: string;
  itinerary: { day: number; title: string; description: string }[];
  sustainabilityFeatures: string[];
  guide: { name: string; bio: string; imageUrl: string };
}

export interface NewsArticle {
  id: number | string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: 'Conservation' | 'Travel' | 'Relief Update';
  date: string;
}

export interface TeamMember {
    id: number | string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

export interface Project {
    id: number | string;
    name: string;
    location: string;
    description: string; // Short description
    longDescription: string; // Detailed description
    imageUrl: string;
    goals: string[];
    impactStats: { value: string; label: string }[];
    galleryImages: string[];
}
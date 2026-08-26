export interface PodcastEpisode {
  id: string;
  title: string;
  episodeNumber: number;
  duration: string;
  date: string;
  description: string;
  audioUrl: string;
  spotifyUrl: string;
  castboxUrl: string;
  tags: string[];
  playsCount: number;
}

export interface Course {
  id: string;
  title: string;
  category: 'فن بیان' | 'علوم شناختی' | 'هوش کلامی' | 'مذاکره';
  description: string;
  longDescription?: string;
  price: string;
  discountPrice?: string;
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  badge?: string;
  features: string[];
  image: string;
  isPopular?: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  category: string;
  excerpt: string;
  content: string[];
  tags: string[];
  views: number;
  likes: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  courseName: string;
  rating: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  bioHeadline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  podcastTitle: string;
  podcastDescription: string;
  emailNewsletterTitle: string;
  emailNewsletterSubtitle: string;
  socialLinks: {
    instagram: string;
    telegram: string;
    youtube: string;
    linkedin: string;
    podcast: string;
  };
  stats: {
    listeners: string;
    students: string;
    episodes: string;
    experience: string;
  };
}

export interface ConsultationOption {
  id: string;
  title: string;
  topic: string;
  duration: string;
  price: string;
  rawPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  format: string;
}

export interface ConsultationBooking {
  optionId: string;
  date: string;
  timeSlot: string;
  userName: string;
  userPhone: string;
  notes?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
}

export interface ProjectMetrics {
  downloads?: string;
  users?: string;
  rating?: string;
  revenue?: string;
  marketshare?: string;
  markets?: string;
  cities?: string;
  categories?: string;
  merchants?: string;
}

export interface ProjectImages {
  hero: string;
  gallery: string[];
  thumbnail: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  position: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  featured: boolean;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  metrics?: ProjectMetrics;
  images: ProjectImages;
  technologies: string[];
  testimonial?: ProjectTestimonial;
}
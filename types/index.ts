export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  resume: string;
}

export interface SocialLinks {
  linkedin: string;
  behance: string;
  email: string;
  whatsapp: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProjectMetrics {
  downloads?: string;
  users?: string;
  rating?: string;
  revenue?: string;
  skus?: string;
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

export interface Testimonial {
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
  metrics?: ProjectMetrics;
  description: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  images: ProjectImages;
  technologies?: string[];
  testimonial?: Testimonial;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  social: SocialLinks;
  navigation: NavItem[];
  services: Service[];
}

export interface ProjectsData {
  projects: Project[];
}

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeInUp' 
  | 'slideInLeft' 
  | 'slideInRight' 
  | 'scale' 
  | 'rotate';

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface ParallaxTile {
  id: string;
  speed: number;
  orbit: 'circle' | 'ellipse';
  radius: number;
}

export interface ScrollTriggerConfig {
  start: string;
  end: string;
  scrub: number | boolean;
  pin?: boolean;
}

export interface ParallaxConfig {
  heroSection: {
    textLayer: { speed: number; offset: number };
    imageLayer: { speed: number; offset: number };
    backgroundLayer: { speed: number; offset: number };
  };
  floatingTiles: {
    tiles: ParallaxTile[];
    scrollTrigger: ScrollTriggerConfig;
  };
}
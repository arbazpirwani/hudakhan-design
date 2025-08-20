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

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
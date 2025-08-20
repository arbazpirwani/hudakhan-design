import { PersonalInfo, SocialLinks, NavigationItem } from '../entities/PersonalInfo';
import { Service } from '../entities/Service';

export interface ContentRepository {
  getPersonalInfo(): Promise<PersonalInfo>;
  getSocialLinks(): Promise<SocialLinks>;
  getNavigation(): Promise<NavigationItem[]>;
  getServices(): Promise<Service[]>;
  getSiteContent(section: string): Promise<any>;
}
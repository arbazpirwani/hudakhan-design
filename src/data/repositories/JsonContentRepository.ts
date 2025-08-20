import { PersonalInfo, SocialLinks, NavigationItem } from '@/domain/entities/PersonalInfo';
import { Service } from '@/domain/entities/Service';
import { ContentRepository } from '@/domain/repositories/ContentRepository';
import portfolioConfig from '../content/portfolio-config.json';
import siteContent from '../content/site-content.json';

export class JsonContentRepository implements ContentRepository {
  async getPersonalInfo(): Promise<PersonalInfo> {
    return Promise.resolve(portfolioConfig.personal);
  }

  async getSocialLinks(): Promise<SocialLinks> {
    return Promise.resolve(portfolioConfig.social);
  }

  async getNavigation(): Promise<NavigationItem[]> {
    return Promise.resolve(portfolioConfig.navigation);
  }

  async getServices(): Promise<Service[]> {
    return Promise.resolve(portfolioConfig.services);
  }

  async getSiteContent(section: string): Promise<any> {
    const content = (siteContent as any)[section];
    return Promise.resolve(content || {});
  }
}
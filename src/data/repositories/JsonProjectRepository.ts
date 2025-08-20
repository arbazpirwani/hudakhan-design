import { Project } from '@/src/domain/entities/Project';
import { ProjectRepository } from '@/src/domain/repositories/ProjectRepository';
import projectsData from '../content/projects.json';

export class JsonProjectRepository implements ProjectRepository {
  private projects: Project[] = projectsData.projects;

  async getAllProjects(): Promise<Project[]> {
    return Promise.resolve(this.projects);
  }

  async getProjectById(id: string): Promise<Project | null> {
    const project = this.projects.find(p => p.id === id);
    return Promise.resolve(project || null);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const featured = this.projects.filter(p => p.featured);
    return Promise.resolve(featured);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    const filtered = this.projects.filter(p => p.category === category);
    return Promise.resolve(filtered);
  }
}
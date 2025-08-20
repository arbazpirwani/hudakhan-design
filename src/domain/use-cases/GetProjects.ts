import { Project } from '../entities/Project';
import { ProjectRepository } from '../repositories/ProjectRepository';

export class GetProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.getAllProjects();
  }

  async getFeatured(): Promise<Project[]> {
    return this.projectRepository.getFeaturedProjects();
  }

  async getById(id: string): Promise<Project | null> {
    return this.projectRepository.getProjectById(id);
  }

  async getByCategory(category: string): Promise<Project[]> {
    return this.projectRepository.getProjectsByCategory(category);
  }
}
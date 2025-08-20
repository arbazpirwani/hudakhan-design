import { Project } from '../entities/Project';

export interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
}
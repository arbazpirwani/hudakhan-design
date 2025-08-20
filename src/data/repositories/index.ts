import { JsonProjectRepository } from './JsonProjectRepository';
import { JsonContentRepository } from './JsonContentRepository';

export const projectRepository = new JsonProjectRepository();
export const contentRepository = new JsonContentRepository();

export { JsonProjectRepository, JsonContentRepository };
// Utility to get the correct asset path based on environment
export const getAssetPath = (path: string): string => {
  const basePath = process.env.NODE_ENV === 'production' ? '/hudakhan-design' : '';
  return `${basePath}${path}`;
};

// Process project data to add basePath to all image URLs
export const processProjectData = (projects: any[]) => {
  return projects.map(project => ({
    ...project,
    images: {
      ...project.images,
      hero: getAssetPath(project.images.hero),
      thumbnail: getAssetPath(project.images.thumbnail),
      gallery: project.images.gallery.map((img: string) => getAssetPath(img))
    }
  }));
};
// Simple utility for image paths that need manual basePath (for Next.js Image component)
export const getImagePath = (path: string): string => {
  const basePath = process.env.NODE_ENV === 'production' ? '/hudakhan-design' : '';
  return `${basePath}${path}`;
};
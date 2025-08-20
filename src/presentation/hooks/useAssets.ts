'use client';

import { useMemo } from 'react';
import assetsConfig from '@/data/content/assets-config.json';

interface UseAssetsReturn {
  getImagePath: (category: string, key: string, fallback?: string) => string;
  getDocumentPath: (key: string) => string;
  assets: typeof assetsConfig;
  optimizedImageProps: (src: string, alt: string) => {
    src: string;
    alt: string;
    loading: 'lazy' | 'eager';
    quality: number;
  };
}

export const useAssets = (): UseAssetsReturn => {
  const getImagePath = useMemo(() => {
    return (category: string, key: string, fallback?: string): string => {
      try {
        // Navigate through nested object
        const categoryData = (assetsConfig.images as any)[category];
        if (categoryData && typeof categoryData === 'object' && key in categoryData) {
          return categoryData[key];
        }
        
        // Try fallback from config
        if (assetsConfig.fallbacks.images && (assetsConfig.fallbacks.images as any)[category]) {
          return (assetsConfig.fallbacks.images as any)[category];
        }
        
        // Use provided fallback or default
        return fallback || '/images/placeholder.jpg';
      } catch (error) {
        console.warn(`Asset not found: ${category}.${key}`, error);
        return fallback || '/images/placeholder.jpg';
      }
    };
  }, []);

  const getDocumentPath = useMemo(() => {
    return (key: string): string => {
      try {
        const document = (assetsConfig.documents as any)[key];
        if (document && document.path) {
          return document.path;
        }
        
        console.warn(`Document not found: ${key}`);
        return '#';
      } catch (error) {
        console.warn(`Error getting document path for: ${key}`, error);
        return '#';
      }
    };
  }, []);

  const optimizedImageProps = useMemo(() => {
    return (src: string, alt: string) => ({
      src,
      alt,
      loading: (assetsConfig.optimization.images.lazy ? 'lazy' : 'eager') as 'lazy' | 'eager',
      quality: assetsConfig.optimization.images.quality
    });
  }, []);

  return {
    getImagePath,
    getDocumentPath,
    assets: assetsConfig,
    optimizedImageProps
  };
};
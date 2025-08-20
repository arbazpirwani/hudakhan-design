'use client';

import { useMemo } from 'react';
import uiStrings from '@/data/content/ui-strings.json';

type StringPath = string;

interface UseStringsReturn {
  t: (path: StringPath, variables?: Record<string, string | number>) => string;
  strings: typeof uiStrings;
}

export const useStrings = (): UseStringsReturn => {
  const t = useMemo(() => {
    return (path: StringPath, variables?: Record<string, string | number>): string => {
      // Navigate through nested object using dot notation
      const keys = path.split('.');
      let value: any = uiStrings;
      
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          console.warn(`String not found for path: ${path}`);
          return path; // Return the path itself as fallback
        }
      }
      
      if (typeof value !== 'string') {
        console.warn(`Value at path ${path} is not a string:`, value);
        return path;
      }
      
      // Replace variables in the string
      if (variables) {
        return Object.entries(variables).reduce((str, [key, val]) => {
          return str.replace(new RegExp(`{${key}}`, 'g'), String(val));
        }, value);
      }
      
      return value;
    };
  }, []);

  return {
    t,
    strings: uiStrings
  };
};
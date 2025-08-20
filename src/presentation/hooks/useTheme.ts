'use client';

import { useState, useEffect, useCallback } from 'react';
import themeConfig from '@/src/data/content/theme-config.json';

export type ThemeMode = 'light' | 'dark';

interface Theme {
  mode: ThemeMode;
  colors: typeof themeConfig.themes.dark.colors;
  gradients: typeof themeConfig.themes.dark.gradients;
  typography: typeof themeConfig.typography;
  spacing: typeof themeConfig.spacing;
  animations: typeof themeConfig.animations;
  breakpoints: typeof themeConfig.breakpoints;
  borderRadius: typeof themeConfig.borderRadius;
  shadows: typeof themeConfig.shadows;
}

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>(themeConfig.defaultTheme as ThemeMode);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    
    setMode(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = useCallback((themeMode: ThemeMode) => {
    const root = document.documentElement;
    const theme = themeConfig.themes[themeMode];
    
    // Apply CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });
    
    // Apply typography and load fonts
    const fonts = themeConfig.typography.fontFamilies;
    Object.entries(fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
    
    // Dynamically load Google Fonts
    if (!document.querySelector('#dynamic-fonts')) {
      const fontLinks = document.createElement('div');
      fontLinks.id = 'dynamic-fonts';
      
      // Load Playfair Display if used
      if (fonts.display.includes('Playfair Display')) {
        const linkDisplay = document.createElement('link');
        linkDisplay.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap';
        linkDisplay.rel = 'stylesheet';
        document.head.appendChild(linkDisplay);
      }
      
      // Load Inter if used  
      if (fonts.body.includes('Inter')) {
        const linkBody = document.createElement('link');
        linkBody.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        linkBody.rel = 'stylesheet';
        document.head.appendChild(linkBody);
      }
      
      document.head.appendChild(fontLinks);
    }
    
    // Apply spacing
    Object.entries(themeConfig.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Apply theme styles to body
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.textPrimary;
    document.body.style.fontFamily = fonts.body;
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/, '');
    document.body.classList.add(`theme-${themeMode}`);
  }, []);

  const toggleTheme = useCallback(() => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    applyTheme(newMode);
  }, [mode, applyTheme]);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    applyTheme(newMode);
  }, [applyTheme]);

  const theme: Theme = {
    mode,
    colors: themeConfig.themes[mode].colors,
    gradients: themeConfig.themes[mode].gradients,
    typography: themeConfig.typography,
    spacing: themeConfig.spacing,
    animations: themeConfig.animations,
    breakpoints: themeConfig.breakpoints,
    borderRadius: themeConfig.borderRadius,
    shadows: themeConfig.shadows
  };

  return {
    theme,
    mode,
    toggleTheme,
    setTheme,
    isDark: mode === 'dark',
    isLight: mode === 'light'
  };
};
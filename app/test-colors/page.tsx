'use client';

import { useEffect, useState } from 'react';

export default function TestColorsPage() {
  const [colors, setColors] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get computed styles from root element
    const root = getComputedStyle(document.documentElement);
    const colorVars = {
      background: root.getPropertyValue('--color-background'),
      textPrimary: root.getPropertyValue('--color-textPrimary'),
      textSecondary: root.getPropertyValue('--color-textSecondary'),
      accent: root.getPropertyValue('--color-accent'),
      gradientPrimary: root.getPropertyValue('--gradient-primary'),
      card: root.getPropertyValue('--color-card'),
      border: root.getPropertyValue('--color-border'),
    };
    setColors(colorVars);
    
    // Check if theme is applied
    const bodyClass = document.body.className;
    if (bodyClass.includes('theme-light')) {
      setTheme('light');
    } else if (bodyClass.includes('theme-dark')) {
      setTheme('dark');
    }
  }, []);
  
  return (
    <div className="min-h-screen p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Color Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Current Theme: {theme}</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded border-2">
          <h3 className="font-bold mb-2">CSS Variables from Root:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(colors, null, 2)}
          </pre>
        </div>
        
        <div className="p-4 rounded border-2">
          <h3 className="font-bold mb-2">Body Styles:</h3>
          <p>Background: {typeof window !== 'undefined' ? (document.body.style.backgroundColor || 'not set') : 'SSR'}</p>
          <p>Color: {typeof window !== 'undefined' ? (document.body.style.color || 'not set') : 'SSR'}</p>
          <p>Font: {typeof window !== 'undefined' ? (document.body.style.fontFamily || 'not set') : 'SSR'}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded bg-dynamic-background-secondary">
          <p className="text-dynamic-text-primary">Primary Text</p>
          <p className="text-dynamic-text-secondary">Secondary Text</p>
        </div>
        
        <div className="p-4 rounded card">
          <p className="font-bold">Card Component</p>
          <p className="text-dynamic-text-muted">Muted text in card</p>
        </div>
        
        <div className="p-4 rounded border-2 border-dynamic-accent">
          <p className="text-gradient">Gradient Text</p>
          <button className="btn-primary mt-2">Primary Button</button>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-bold mb-4">Theme Colors from JSON:</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="w-full h-20 rounded" style={{ backgroundColor: '#0A0A0A' }}></div>
            <p className="text-xs mt-1">Dark BG: #0A0A0A</p>
          </div>
          <div>
            <div className="w-full h-20 rounded" style={{ backgroundColor: '#FFFFFF' }}></div>
            <p className="text-xs mt-1">Light BG: #FFFFFF</p>
          </div>
          <div>
            <div className="w-full h-20 rounded" style={{ backgroundColor: '#8B5CF6' }}></div>
            <p className="text-xs mt-1">Accent: #8B5CF6</p>
          </div>
          <div>
            <div className="w-full h-20 rounded" style={{ backgroundColor: '#EC4899' }}></div>
            <p className="text-xs mt-1">Accent 2: #EC4899</p>
          </div>
        </div>
      </div>
    </div>
  );
}
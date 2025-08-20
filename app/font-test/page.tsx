'use client';

import { useEffect, useState } from 'react';

export default function FontTestPage() {
  const [fontInfo, setFontInfo] = useState<any>({});
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const computedStyles = getComputedStyle(document.body);
    const root = getComputedStyle(document.documentElement);
    
    setFontInfo({
      bodyFontFamily: computedStyles.fontFamily,
      bodyFontSize: computedStyles.fontSize,
      cssVarFontPrimary: root.getPropertyValue('--font-primary'),
      cssVarFontDisplay: root.getPropertyValue('--font-display'),
      cssVarFontBody: root.getPropertyValue('--font-body'),
      googleFontLinks: Array.from(document.querySelectorAll('link[href*="fonts.googleapis"]')).map(
        (link: any) => link.href
      ),
      actualFontUsed: document.fonts.ready.then(() => {
        const fonts = Array.from(document.fonts);
        return fonts.map((font: any) => font.family);
      })
    });
  }, []);

  return (
    <div className="min-h-screen p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8 font-display">Font Test Page</h1>
      
      <div className="space-y-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Current Font Information:</h2>
          <pre className="text-sm overflow-auto bg-dynamic-background-tertiary p-4 rounded">
            {JSON.stringify(fontInfo, null, 2)}
          </pre>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Font Samples:</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-dynamic-text-secondary mb-2">Default body text (should be Inter):</p>
              <p className="text-xl">The quick brown fox jumps over the lazy dog</p>
            </div>
            
            <div>
              <p className="text-sm text-dynamic-text-secondary mb-2">font-display class (should be Playfair Display):</p>
              <p className="text-xl font-display">The quick brown fox jumps over the lazy dog</p>
            </div>
            
            <div>
              <p className="text-sm text-dynamic-text-secondary mb-2">font-body class (should be Inter):</p>
              <p className="text-xl font-body">The quick brown fox jumps over the lazy dog</p>
            </div>
            
            <div>
              <p className="text-sm text-dynamic-text-secondary mb-2">Direct font test:</p>
              <p className="text-xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Inter: The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                Playfair Display: The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-xl" style={{ fontFamily: "GeistMono, monospace" }}>
                GeistMono: The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Font Configuration Sources:</h2>
          <ul className="space-y-2 text-sm">
            <li><strong>theme-config.json:</strong> Inter & Playfair Display</li>
            <li><strong>assets-config.json:</strong> Inter (Google Fonts link)</li>
            <li><strong>CSS Variables:</strong> --font-primary, --font-display</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
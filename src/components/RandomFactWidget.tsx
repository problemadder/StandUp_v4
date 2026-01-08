"use client";

import React, { useEffect, useRef } from 'react';

// Declare RandomFacts on the Window object to avoid TypeScript errors
declare global {
  interface Window {
    RandomFacts: {
      init: (options: { container: string; width: string; height: string; theme: string }) => void;
    };
  }
}

const RandomFactWidget: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current && window.RandomFacts) {
      window.RandomFacts.init({
        container: '#randomfacts-widget',
        width: '100%', // Make it responsive
        height: '300px',
        theme: 'auto'
      });
    }
  }, []);

  return (
    <div id="randomfacts-widget" ref={widgetRef} className="w-full h-[300px] flex items-center justify-center bg-card rounded-lg shadow-md overflow-hidden">
      <p className="text-muted-foreground">Lade einen zufälligen Fakt...</p>
    </div>
  );
};

export default RandomFactWidget;
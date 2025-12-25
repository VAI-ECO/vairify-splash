import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  pastHero: boolean;
  scrollDirection: 'up' | 'down' | null;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    pastHero: false,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      
      setPosition({
        scrollY: currentScrollY,
        scrollX: window.scrollX,
        pastHero: currentScrollY > heroHeight,
        scrollDirection: currentScrollY > lastScrollY ? 'down' : 'up',
      });
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return position;
}

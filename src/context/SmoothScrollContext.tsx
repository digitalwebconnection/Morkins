import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import 'lenis/dist/lenis.css';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    let animationFrameId: number;

    function raf(time: number) {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
      delete (window as any).lenis;
    };
  }, []);

  // Handle route change & anchor smooth scrolling
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash, location.key]);

  const scrollTo = (target: string | HTMLElement | number, options?: any) => {
    lenisRef.current?.scrollTo(target as any, options);
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

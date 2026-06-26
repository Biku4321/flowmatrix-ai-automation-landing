import { useState, useEffect, useRef, useCallback } from 'react';

const MOBILE_BREAKPOINT = 768; 


export function useBentoAccordionState(itemCount) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );
  const [activeIndex, setActiveIndex] = useState(0);


  const isInteractingRef = useRef(false);

  useEffect(() => {
    let rafId = null;

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
        setIsMobile((prev) => (prev !== nowMobile ? nowMobile : prev));
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const setActive = useCallback(
    (index) => {
      if (index < 0 || index >= itemCount) return;
      setActiveIndex(index);
    },
    [itemCount]
  );

  const markInteracting = useCallback((value) => {
    isInteractingRef.current = value;
  }, []);

  return {
    isMobile,
    activeIndex,
    setActive,
    markInteracting,
  };
}

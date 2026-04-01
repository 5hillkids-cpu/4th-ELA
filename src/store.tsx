import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface StoreState {
  xp: number;
  badges: string[];
  soundOn: boolean;
  captionsOn: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  addXP: (amount: number) => void;
  earnBadge: (name: string) => void;
  toggleSound: () => void;
  toggleCaptions: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const reducedMotionOS = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [reducedMotion, setReducedMotion] = useState(reducedMotionOS);

  const addXP = useCallback((amount: number) => setXP(v => v + amount), []);
  const earnBadge = useCallback((name: string) => setBadges(prev => prev.includes(name) ? prev : [...prev, name]), []);
  const toggleSound = useCallback(() => setSoundOn(v => !v), []);
  const toggleCaptions = useCallback(() => setCaptionsOn(v => !v), []);
  const toggleHighContrast = useCallback(() => setHighContrast(v => !v), []);
  const toggleReducedMotion = useCallback(() => setReducedMotion(v => !v), []);

  useEffect(() => {
    document.body.dataset.highContrast = highContrast ? 'true' : '';
    document.body.dataset.reducedMotion = reducedMotion ? 'true' : '';
  }, [highContrast, reducedMotion]);

  return (
    <StoreContext.Provider value={{ xp, badges, soundOn, captionsOn, highContrast, reducedMotion, addXP, earnBadge, toggleSound, toggleCaptions, toggleHighContrast, toggleReducedMotion }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

"use client";

import { useEffect, useState } from 'react';
import { isPWA, getDisplayMode } from '@/lib/pwa';

export const usePWA = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [displayMode, setDisplayMode] = useState<string>('browser');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if app is installed
    setIsAppInstalled(isPWA());
    setDisplayMode(getDisplayMode());

    // Check online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => {
      setIsAppInstalled(isPWA());
      setDisplayMode(getDisplayMode());
    };

    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  return {
    isAppInstalled,
    displayMode,
    isOnline,
    isPWASupported: typeof window !== 'undefined' && 'serviceWorker' in navigator,
  };
};

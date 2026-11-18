'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  settings: Record<string, string>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  announcementDismissed: boolean;
  dismissAnnouncement: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
  initialSettings = {},
}: {
  children: React.ReactNode;
  initialSettings?: Record<string, string>;
}) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    // If initialSettings is empty, fetch from public API
    if (Object.keys(settings).length === 0) {
      fetch('/api/settings')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.settings) {
            setSettings(data.settings);
          }
        })
        .catch((err) => console.error('Error fetching settings:', err));
    }
  }, []);

  const dismissAnnouncement = () => {
    setAnnouncementDismissed(true);
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        announcementDismissed,
        dismissAnnouncement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

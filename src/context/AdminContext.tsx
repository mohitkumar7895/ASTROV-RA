'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminUser } from '@/types';
import { toast } from 'sonner';

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
  children,
  initialAdmin = null,
}: {
  children: React.ReactNode;
  initialAdmin?: AdminUser | null;
}) {
  const [admin, setAdmin] = useState<AdminUser | null>(initialAdmin);
  const [isLoading, setIsLoading] = useState(!initialAdmin);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const fetchCurrentAdmin = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin || null);
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialAdmin) {
      fetchCurrentAdmin();
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setAdmin(null);
        toast.success('Logged out successfully');
        router.push('/admin/login');
      } else {
        toast.error('Logout failed');
      }
    } catch (err) {
      toast.error('Network error during logout');
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoading,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        logout,
        refreshAdmin: fetchCurrentAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

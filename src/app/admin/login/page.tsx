'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Lock, Mail, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { refreshAdmin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      toast.success('Welcome back, ' + data.admin.name);
      await refreshAdmin();
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Login error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-astro-midnight">
      {/* Background radial cosmic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-astro-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl border border-astro-gold flex items-center justify-center bg-astro-navy mx-auto mb-4 shadow-goldGlow">
            <span className="font-heading font-bold text-astro-gold text-2xl">AV</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-widest text-astro-ivory">
            ASTROVÈRA
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-astro-gold font-accent mt-1">
            Administrative Sanctuary
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-astro-navy/80 border border-astro-border p-8 shadow-navyGlow backdrop-blur-md">
          <div className="mb-6">
            <h2 className="font-heading text-xl font-bold text-astro-ivory">
              Admin Authentication
            </h2>
            <p className="text-astro-slate text-xs mt-1">
              Enter your authorized administrative credentials to manage ASTROVÈRA.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-slate" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@astrovera.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold focus:outline-none text-astro-ivory text-sm placeholder:text-astro-slate/40 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-slate" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold focus:outline-none text-astro-ivory text-sm placeholder:text-astro-slate/40 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-astro-midnight" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Enter Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Seed credentials hint for first-time access */}
          <div className="mt-6 pt-5 border-t border-astro-border/30 text-center">
            <p className="text-[11px] text-astro-slate font-accent">
              Default Seed Email: <strong className="text-astro-gold">admin@astrovera.com</strong>
            </p>
            <p className="text-[10px] text-astro-slate/80 font-accent mt-0.5">
              Default Password: <code className="text-astro-ivory">Admin@Astro2026!</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Users,
  UserPlus,
  Pencil,
  Trash2,
  KeyRound,
  Shield,
  CheckCircle,
  XCircle,
  Save,
  X,
  Loader2,
} from 'lucide-react';
import { AdminUser, Role } from '@/types';
import { formatDate } from '@/lib/utils';
import { useAdmin } from '@/context/AdminContext';

interface Props {
  initialUsers: AdminUser[];
  roles: Role[];
}

export function UsersManagerClient({ initialUsers, roles }: Props) {
  const { admin: currentAdmin } = useAdmin();
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<AdminUser> & { password?: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openCreateModal = () => {
    setEditingUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      role_id: roles[0]?.id || 1,
      is_active: 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser({
      ...user,
      password: '', // Blank unless updating
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser?.name || !editingUser?.email) {
      toast.error('Name and email are required');
      return;
    }

    if (!editingUser.id && !editingUser.password) {
      toast.error('Password is required for new accounts');
      return;
    }

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingUser.id);
      const url = isEdit ? `/api/users/${editingUser.id}` : '/api/users';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save admin user');

      toast.success(isEdit ? 'Admin user updated' : 'Admin user created');
      setIsModalOpen(false);

      // Refresh users
      const uRes = await fetch('/api/users');
      const uData = await uRes.json();
      setUsers(uData.users || []);
    } catch (err: any) {
      toast.error(err.message || 'Error saving user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (id === currentAdmin?.id) {
      toast.error('You cannot delete your own administrative account');
      return;
    }

    if (!confirm(`Are you sure you want to delete administrator "${name}"?`)) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');

      toast.success('Admin user deleted');
      setUsers(users.filter((u) => u.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Error deleting user');
    }
  };

  const handleToggleActive = async (user: AdminUser) => {
    if (user.id === currentAdmin?.id) {
      toast.error('You cannot deactivate your own account');
      return;
    }

    const updated = user.is_active ? 0 : 1;
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: updated }),
      });
      if (!res.ok) throw new Error('Toggle failed');

      setUsers(users.map((u) => (u.id === user.id ? { ...u, is_active: updated } : u)));
      toast.success(`User ${updated ? 'activated' : 'deactivated'}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update user status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Admin User &amp; Role Management
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Create administrators, assign role-based permissions, and manage secure credentials.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-astro-midnight" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-4 sm:p-6 shadow-navyGlow overflow-x-auto">
        <table className="w-full text-left text-xs font-body min-w-[650px]">
          <thead>
            <tr className="border-b border-astro-border/40 text-[11px] font-accent uppercase tracking-wider text-astro-slate">
              <th className="py-3 px-3">Administrator</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Contact</th>
              <th className="py-3 px-3">Last Login</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-astro-border/20 text-astro-ivory">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-astro-navy/40 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-astro-midnight border border-astro-gold/60 flex items-center justify-center font-bold text-astro-gold text-xs font-heading">
                      {u.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-astro-ivory">{u.name}</div>
                      <div className="text-[10px] text-astro-slate">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-accent font-semibold tracking-wider uppercase bg-astro-midnight border border-astro-border text-astro-gold">
                    {u.role_display_name || u.role_name || 'Admin'}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-astro-slate">
                  {u.phone || '—'}
                </td>
                <td className="py-3.5 px-3 text-astro-slate whitespace-nowrap">
                  {u.last_login_at ? formatDate(u.last_login_at) : 'Never'}
                </td>
                <td className="py-3.5 px-3">
                  <button
                    onClick={() => handleToggleActive(u)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-accent uppercase tracking-wider font-semibold transition-colors ${
                      u.is_active
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {u.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{u.is_active ? 'Active' : 'Disabled'}</span>
                  </button>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(u)}
                      className="p-1.5 rounded-lg text-astro-slate hover:text-astro-gold hover:bg-astro-navy transition-colors"
                      title="Edit User or Reset Password"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {u.id !== currentAdmin?.id && (
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-astro-navy border border-astro-border p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-astro-border/40">
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                {editingUser?.id ? 'Edit Administrator' : 'Create Admin Account'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-astro-slate hover:text-astro-ivory p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingUser?.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="e.g. Puneet Dwivedi"
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={editingUser?.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="admin@astrovera.com"
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editingUser?.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  placeholder="+91 96306 20240"
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Administrative Role *
                </label>
                <select
                  value={editingUser?.role_id || 1}
                  onChange={(e) => setEditingUser({ ...editingUser, role_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.display_name} ({r.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  {editingUser?.id ? 'New Password (Leave blank to keep current)' : 'Password *'}
                </label>
                <input
                  type="password"
                  value={editingUser?.password || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  placeholder={editingUser?.id ? 'Leave blank to preserve' : '••••••••••••'}
                  required={!editingUser?.id}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-astro-border/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-accent uppercase text-astro-slate"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow flex items-center gap-1.5"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

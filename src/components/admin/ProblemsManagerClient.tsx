'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  FolderPlus,
  CheckCircle,
  XCircle,
  Save,
  X,
  Loader2,
} from 'lucide-react';
import { ProblemCategory, ProblemQuestion, AstrologyService } from '@/types';

interface Props {
  initialCategories: ProblemCategory[];
  initialQuestions: ProblemQuestion[];
  services: AstrologyService[];
}

export function ProblemsManagerClient({
  initialCategories,
  initialQuestions,
  services,
}: Props) {
  const [categories, setCategories] = useState<ProblemCategory[]>(initialCategories);
  const [questions, setQuestions] = useState<ProblemQuestion[]>(initialQuestions);

  // Question Modal state
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<ProblemQuestion> | null>(null);

  // Category Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<ProblemCategory> | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  // Open Create Question
  const openCreateQuestion = (catId?: number) => {
    setEditingQuestion({
      category_id: catId || categories[0]?.id || 1,
      service_id: null,
      question: '',
      description: '',
      inquiry_btn_label: 'Inquiry',
      display_order: questions.length + 1,
      is_active: 1,
    });
    setIsQuestionModalOpen(true);
  };

  const openEditQuestion = (q: ProblemQuestion) => {
    setEditingQuestion({ ...q });
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion?.question) {
      toast.error('Question text is required');
      return;
    }

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingQuestion.id);
      const url = isEdit ? `/api/problems/questions/${editingQuestion.id}` : '/api/problems/questions';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingQuestion),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save question');

      toast.success(isEdit ? 'Question updated' : 'Question added');
      setIsQuestionModalOpen(false);

      // Refresh
      const qRes = await fetch('/api/problems/questions');
      const qData = await qRes.json();
      setQuestions(qData.questions || []);
    } catch (err: any) {
      toast.error(err.message || 'Error saving question');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`/api/problems/questions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete question');

      toast.success('Question deleted');
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Error deleting question');
    }
  };

  // Open Create Category
  const openCreateCategory = () => {
    setEditingCategory({
      name: '',
      slug: '',
      description: '',
      icon: 'Compass',
      display_order: categories.length + 1,
      is_active: 1,
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (cat: ProblemCategory) => {
    setEditingCategory({ ...cat });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) {
      toast.error('Category name is required');
      return;
    }

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingCategory.id);
      const url = isEdit ? `/api/problems/categories/${editingCategory.id}` : '/api/problems/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save category');

      toast.success(isEdit ? 'Category updated' : 'Category created');
      setIsCategoryModalOpen(false);

      // Refresh
      const catRes = await fetch('/api/problems/categories');
      const catData = await catRes.json();
      setCategories(catData.categories || []);
    } catch (err: any) {
      toast.error(err.message || 'Error saving category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}" and all its questions?`)) return;
    try {
      const res = await fetch(`/api/problems/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete category');

      toast.success('Category deleted');
      setCategories(categories.filter((c) => c.id !== id));
      setQuestions(questions.filter((q) => q.category_id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Error deleting category');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Problems &amp; Questions Management
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Manage the problem categories and questions shown on the public /problems page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateCategory}
            className="px-4 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-ivory border border-astro-border hover:border-astro-gold hover:bg-astro-navy transition-all flex items-center gap-1.5"
          >
            <FolderPlus className="w-4 h-4 text-astro-gold" />
            <span>Add Category</span>
          </button>
          <button
            onClick={() => openCreateQuestion()}
            className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-astro-midnight" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Categories & Questions View */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const catQuestions = questions.filter((q) => q.category_id === cat.id);

          return (
            <div
              key={cat.id}
              className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-astro-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold font-bold">
                    {cat.name[0]}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-astro-gold">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-astro-slate">
                      {cat.description || 'Targeted problems in this sphere'} • {catQuestions.length} Questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => openCreateQuestion(cat.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-accent text-astro-gold border border-astro-border hover:bg-astro-midnight flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to {cat.name}</span>
                  </button>
                  <button
                    onClick={() => openEditCategory(cat)}
                    className="p-1.5 rounded-lg text-astro-slate hover:text-astro-ivory hover:bg-astro-midnight"
                    title="Edit Category"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400 hover:bg-rose-950/20"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-2xl bg-astro-midnight/80 border border-astro-border/50 p-4 flex flex-col justify-between hover:border-astro-gold/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-heading text-sm font-semibold text-astro-ivory leading-snug">
                          {q.question}
                        </h4>
                        <span className="text-[10px] font-mono text-astro-slate shrink-0">
                          #{q.display_order}
                        </span>
                      </div>
                      {q.description && (
                        <p className="text-xs text-astro-slate line-clamp-2 font-body mb-3">
                          {q.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-astro-border/30 flex items-center justify-between">
                      <span className="text-[10px] font-accent text-astro-gold px-2 py-0.5 rounded bg-astro-navy">
                        Btn: {q.inquiry_btn_label || 'Inquiry'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditQuestion(q)}
                          className="p-1 rounded text-astro-slate hover:text-astro-gold transition-colors"
                          title="Edit Question"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1 rounded text-astro-slate hover:text-rose-400 transition-colors"
                          title="Delete Question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* QUESTION MODAL */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-astro-navy border border-astro-border p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-astro-border/40">
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                {editingQuestion?.id ? 'Edit Question' : 'Add Problem Question'}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-astro-slate hover:text-astro-ivory p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Category *
                </label>
                <select
                  value={editingQuestion?.category_id || categories[0]?.id || 1}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, category_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Question Text *
                </label>
                <input
                  type="text"
                  required
                  value={editingQuestion?.question || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  placeholder="e.g. When will I get married?"
                  className="w-full px-3 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Astrological Explanation / Guidance Hint
                </label>
                <textarea
                  rows={2}
                  value={editingQuestion?.description || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                    Linked Service (Optional)
                  </label>
                  <select
                    value={editingQuestion?.service_id || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, service_id: e.target.value ? Number(e.target.value) : null })}
                    className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  >
                    <option value="">None (General)</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={editingQuestion?.inquiry_btn_label || 'Inquiry'}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, inquiry_btn_label: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-astro-border/40">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
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
                  <span>Save Question</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-astro-navy border border-astro-border p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-astro-border/40">
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                {editingCategory?.id ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-astro-slate hover:text-astro-ivory p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory?.name || ''}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingCategory({ ...editingCategory, name, slug: editingCategory?.slug || slug });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Category Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory?.slug || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory?.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-astro-border/40">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
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
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

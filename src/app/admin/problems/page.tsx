import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getAllProblemCategories, getAllProblemQuestions, getAllServices } from '@/lib/queries';
import { ProblemsManagerClient } from '@/components/admin/ProblemsManagerClient';

export const revalidate = 0;

export default async function AdminProblemsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [categories, questions, services] = await Promise.all([
    getAllProblemCategories().catch(() => []),
    getAllProblemQuestions().catch(() => []),
    getAllServices().catch(() => []),
  ]);

  return (
    <ProblemsManagerClient
      initialCategories={categories}
      initialQuestions={questions}
      services={services}
    />
  );
}

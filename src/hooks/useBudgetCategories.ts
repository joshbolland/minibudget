'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { BudgetCategory } from '@/types/budget';

async function fetchCategories(): Promise<BudgetCategory[]> {
    const res = await fetch('/api/budget-categories');
    if (!res.ok) throw new Error('Failed to fetch budget categories');
    return res.json();
}

async function createCategory(category: Partial<BudgetCategory>) {
    const res = await fetch('/api/budget-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Failed to create budget category');
    return res.json();
}

async function updateCategory(id: string, updates: Partial<BudgetCategory>) {
    const res = await fetch(`/api/budget-categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update budget category');
    return res.json();
}

async function deleteCategory(id: string) {
    const res = await fetch(`/api/budget-categories/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete budget category');
    return res.json();
}

export function useGetBudgetCategories() {
    return useQuery<BudgetCategory[]>({
        queryKey: ['budgetCategories'],
        queryFn: fetchCategories,
    });
}

export function useCreateBudgetCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgetCategories'] }),
    });
}

export function useUpdateBudgetCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<BudgetCategory> }) =>
            updateCategory(id, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgetCategories'] }),
    });
}

export function useDeleteBudgetCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgetCategories'] }),
    });
}
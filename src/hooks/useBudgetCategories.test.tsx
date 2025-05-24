import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/createQueryClient';

import {
  useGetBudgetCategories,
  useCreateBudgetCategory,
  useUpdateBudgetCategory,
  useDeleteBudgetCategory,
} from './useBudgetCategories';

const createWrapper = () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

describe('useBudgetCategories hooks', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('fetches budget categories successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '1', name: 'Groceries', budgeted: 100, spent: 50 }],
    });

    const { result } = renderHook(() => useGetBudgetCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].name).toBe('Groceries');
  });

  it('handles create category mutation', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '2', name: 'New', budgeted: 100, spent: 0 }),
    });

    const { result } = renderHook(() => useCreateBudgetCategory(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync({ name: 'New', budgeted: 100 });
    expect(fetch).toHaveBeenCalledWith('/api/budget-categories', expect.anything());
  });

  it('handles update category mutation', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '1', name: 'Groceries', budgeted: 150, spent: 50 }),
    });

    const { result } = renderHook(() => useUpdateBudgetCategory(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync({
      id: '1',
      updates: { budgeted: 150 },
    });
    expect(fetch).toHaveBeenCalledWith('/api/budget-categories/1', expect.anything());
  });

  it('handles delete category mutation', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '1' }),
    });

    const { result } = renderHook(() => useDeleteBudgetCategory(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync('1');
    expect(fetch).toHaveBeenCalledWith('/api/budget-categories/1', expect.anything());
  });
});

it('handles fetch categories error', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  const { result } = renderHook(() => useGetBudgetCategories(), {
    wrapper: createWrapper(),
  });
  await waitFor(() => expect(result.current.isError).toBe(true));
});

it('handles create category error', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  const { result } = renderHook(() => useCreateBudgetCategory(), {
    wrapper: createWrapper(),
  });
  await expect(result.current.mutateAsync({ name: 'Fail', budgeted: 0 })).rejects.toThrow();
});

it('handles update category error', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  const { result } = renderHook(() => useUpdateBudgetCategory(), {
    wrapper: createWrapper(),
  });
  await expect(result.current.mutateAsync({ id: '1', updates: { budgeted: 0 } })).rejects.toThrow();
});

it('handles delete category error', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  const { result } = renderHook(() => useDeleteBudgetCategory(), {
    wrapper: createWrapper(),
  });
  await expect(result.current.mutateAsync('1')).rejects.toThrow();
});
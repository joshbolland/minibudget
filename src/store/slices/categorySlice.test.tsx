import { act } from '@testing-library/react';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { createCategorySlice, CategoryState } from '@/store/slices/categorySlice';

jest.useFakeTimers();

describe('categorySlice', () => {
  let useStore: UseBoundStore<StoreApi<CategoryState>>;

  beforeEach(() => {
    useStore = create<CategoryState>((...a) => ({
      ...createCategorySlice(...a),
    }));
  });


  it('has correct initial state', () => {
    const state = useStore.getState();
    expect(state.categories).toEqual([]);
    expect(state.categoriesLoading).toBe(false);
    expect(typeof state.fetchCategories).toBe('function');
  });

  it('sets loading to true when fetchCategories is called', () => {
    act(() => {
      useStore.getState().fetchCategories();
    });
    expect(useStore.getState().categoriesLoading).toBe(true);
  });

  it('populates categories and sets loading to false after fetch', () => {
    act(() => {
      useStore.getState().fetchCategories();
      jest.runAllTimers();
    });
    const state = useStore.getState();
    expect(state.categoriesLoading).toBe(false);
    expect(state.categories).toEqual([
      { id: '1', name: 'Rent', budget: 800, spent: 500 },
      { id: '2', name: 'Groceries', budget: 250, spent: 180 },
      { id: '3', name: 'Transport', budget: 100, spent: 60 },
      { id: '4', name: 'Subscriptions', budget: 50, spent: 28 },
    ]);
  });
});
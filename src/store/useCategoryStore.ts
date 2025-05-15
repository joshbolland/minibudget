import { create } from 'zustand';
import { nanoid } from 'nanoid';

export type Category = {
    id: string;
    name: string;
};

type CategoryState = {
    categories: Category[];
    addCategory: (name: string) => void;
    deleteCategory: (id: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    addCategory: (name) =>
        set((state) => ({
            categories: [...state.categories, { id: nanoid(), name }],
        })),
    deleteCategory: (id) =>
        set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
        })),
}));
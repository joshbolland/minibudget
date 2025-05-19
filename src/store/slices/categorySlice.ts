import { StateCreator } from 'zustand';

export type Category = {
    id: string;
    name: string;
    budget: number;
    spent: number;
};

export interface CategoryState {
    categories: Category[];
    categoriesLoading: boolean;
    fetchCategories: () => void;
}

export const createCategorySlice: StateCreator<CategoryState, [], [], CategoryState> = (set) => ({
    categories: [],
    categoriesLoading: false,
    fetchCategories: () => {
        set({ categoriesLoading: true });
        setTimeout(() => {
            set({
                categories: [
                    { id: '1', name: 'Rent', budget: 800, spent: 500 },
                    { id: '2', name: 'Groceries', budget: 250, spent: 180 },
                    { id: '3', name: 'Transport', budget: 100, spent: 60 },
                    { id: '4', name: 'Subscriptions', budget: 50, spent: 28 },
                ],
                categoriesLoading: false,
            });
        }, 500);
    },
});

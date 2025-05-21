import { create } from 'zustand';
import { createAuthSlice, AuthState } from './slices/authSlice';
import { createAccountSlice, AccountState } from './slices/accountSlice';
import { createCategorySlice, CategoryState } from './slices/categorySlice';

type StoreState = AuthState & AccountState & CategoryState;

export const useAppStore = create<StoreState>((set, get, store) => ({
    ...createAuthSlice(set, get, store),
    ...createAccountSlice(set, get, store),
    ...createCategorySlice(set, get, store),
}));
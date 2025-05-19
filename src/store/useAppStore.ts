import { create } from 'zustand';
import { createAuthSlice, AuthState } from './slices/authSlice';
import { createTransactionSlice, TransactionState } from './slices/transactionSlice';
import { createAccountSlice, AccountState } from './slices/accountSlice';
import { createCategorySlice, CategoryState } from './slices/categorySlice';

type StoreState = AuthState & TransactionState & AccountState & CategoryState;

export const useAppStore = create<StoreState>((set, get, store) => ({
    ...createAuthSlice(set, get, store),
    ...createTransactionSlice(set, get, store),
    ...createAccountSlice(set, get, store),
    ...createCategorySlice(set, get, store),
}));
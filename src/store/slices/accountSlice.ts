import { StateCreator } from 'zustand';

export interface Account {
    id: string;
    name: string;
    type: string;
    balance: number;
}

export interface AccountState {
    accounts: Account[];
    accountsLoading: boolean;
    accountsError: string | null;
    fetchAccounts: () => Promise<void>;
    addAccount: (account: Account) => void;
}

export const createAccountSlice: StateCreator<AccountState, [], [], AccountState> = (set) => ({
    accounts: [],
    accountsLoading: false,
    accountsError: null,

    fetchAccounts: async () => {
        set((state) => ({ ...state, accountsLoading: true, accountsError: null }));
        try {
            const mockAccounts: Account[] = [
                { id: '1', name: 'Monzo', type: 'Bank', balance: 814.75 },
                { id: '2', name: 'Chase Saver', type: 'Savings', balance: 1200.0 },
                { id: '3', name: 'Amex Credit', type: 'Credit Card', balance: -142.20 },
            ];
            await new Promise((res) => setTimeout(res, 500));
            set((state) => ({ ...state, accounts: mockAccounts, accountsLoading: false }));
        } catch (error: unknown) {
            set((state) => ({
                ...state,
                accountsError: error instanceof Error ? error.message : 'Error loading accounts',
                accountsLoading: false,
            }));
        }
    },

    addAccount: (account: Account) => {
        set((state) => ({
            ...state,
            accounts: [account, ...state.accounts],
        }));
    },
});

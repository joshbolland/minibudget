import { StateCreator } from 'zustand';
export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
}

export interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
    fetchTransactions: () => Promise<void>;
    addTransaction: (tx: Transaction) => void;
}

export const createTransactionSlice: StateCreator<TransactionState, [], [], TransactionState> = (set) => ({
    transactions: [],
    loading: false,
    error: null,

    fetchTransactions: async () => {
        set({ loading: true, error: null });
        try {
            // Replace with API call when ready
            const mockData: Transaction[] = [
                { id: '1', description: 'Tesco', amount: -32.5, date: '2025-05-15', category: 'Groceries' },
                { id: '2', description: 'TFL', amount: -2.9, date: '2025-05-14', category: 'Transport' },
            ];
            await new Promise((res) => setTimeout(res, 500)); // Simulate network
            set({ transactions: mockData, loading: false });
        } catch (error: unknown) {
            set({ error: error instanceof Error ? error.message : 'Error loading transactions', loading: false });
        }
    },

    addTransaction: (tx: Transaction) => {
        set((state) => ({
            transactions: [tx, ...state.transactions],
        }));
    },
});

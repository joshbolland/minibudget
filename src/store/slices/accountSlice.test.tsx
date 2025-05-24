import { create, UseBoundStore, StoreApi } from 'zustand';
import { createAccountSlice, AccountState, Account } from './accountSlice';

describe('accountSlice', () => {
  let useStore: UseBoundStore<StoreApi<AccountState>>;

  beforeEach(() => {
    useStore = create<AccountState>((...a) => ({
      ...createAccountSlice(...a),
    }));
  });

  it('initial state is correct', () => {
    const store = useStore.getState();
    expect(store.accounts).toEqual([]);
    expect(store.accountsLoading).toBe(false);
    expect(store.accountsError).toBeNull();
  });

  it('adds an account correctly', () => {
    const newAccount: Account = {
      id: '4',
      name: 'New Account',
      type: 'Bank',
      balance: 100,
    };
    useStore.getState().addAccount(newAccount);
    expect(useStore.getState().accounts).toContainEqual(newAccount);
  });

  it('fetchAccounts updates the state with mock accounts', async () => {
    await useStore.getState().fetchAccounts();
    const store = useStore.getState();
    expect(store.accounts).toHaveLength(3);
    expect(store.accountsLoading).toBe(false);
    expect(store.accountsError).toBeNull();
  });

  it('sets error state when fetchAccounts fails', async () => {
    const errorMessage = 'Network error';
    const faultyStore = create<AccountState>((set) => ({
      accounts: [],
      accountsLoading: false,
      accountsError: null,
      fetchAccounts: async () => {
        set({
          accountsLoading: false,
          accountsError: errorMessage,
          accounts: [],
        });
      },
      addAccount: jest.fn(),
    }));

    await faultyStore.getState().fetchAccounts();

    const store = faultyStore.getState();
    expect(store.accountsError).toBe(errorMessage);
    expect(store.accountsLoading).toBe(false);
  });
  it('handles error in fetchAccounts from createAccountSlice', async () => {
    const errorMessage = 'Simulated failure';

    const errorSlice = create<AccountState>((set, get, store) =>
    ({
      ...createAccountSlice(set, get, store),
      fetchAccounts: async () => {
        set((state) => ({ ...state, accountsLoading: true, accountsError: null }));
        set((state) => ({ ...state, accountsLoading: false, accountsError: errorMessage }));
        throw new Error(errorMessage);
      },
    })
    );

    try {
      await errorSlice.getState().fetchAccounts();
    } catch { }

    const state = errorSlice.getState();
    expect(state.accountsLoading).toBe(false);
    expect(state.accountsError).toBe(errorMessage);
  });

  it('handles unknown error object in fetchAccounts', async () => {
    const errorSlice = create<AccountState>((set, get, store) => ({
      ...createAccountSlice(set, get, store),
      fetchAccounts: async () => {
        set((state) => ({ ...state, accountsLoading: true, accountsError: null }));
        try {
          throw 'non-error object';
        } catch (error: unknown) {
          set((state) => ({
            ...state,
            accountsError: error instanceof Error ? error.message : 'Error loading accounts',
            accountsLoading: false,
          }));
        }
      },
    }));

    await errorSlice.getState().fetchAccounts();
    const state = errorSlice.getState();
    expect(state.accountsLoading).toBe(false);
    expect(state.accountsError).toBe('Error loading accounts');
  });
});
it('sets accountsLoading true and accountsError null on fetchAccounts start', async () => {
  const loadingStore = create<AccountState>((set, get, store) => ({
    ...createAccountSlice(set, get, store),
    fetchAccounts: async () => {
      set((state) => ({ ...state, accountsLoading: true, accountsError: null }));
      return Promise.resolve();
    },
  }));

  await loadingStore.getState().fetchAccounts();
  const state = loadingStore.getState();
  expect(state.accountsLoading).toBe(true);
  expect(state.accountsError).toBeNull();
});
it('sets accountsError and accountsLoading false if fetchAccounts throws', async () => {
  // Patch the global Promise to throw inside the try block
  const errorMessage = 'Simulated fetch failure';
  const originalSetTimeout = global.setTimeout;
  // Patch setTimeout to throw
  global.setTimeout = (() => {
    throw new Error(errorMessage);
  }) as unknown as typeof setTimeout;

  const store = create<AccountState>((set, get) => ({
    ...createAccountSlice(set, get, {} as unknown as StoreApi<AccountState>),
  }));

  await store.getState().fetchAccounts();

  const state = store.getState();
  expect(state.accountsError).toBe(errorMessage);
  expect(state.accountsLoading).toBe(false);

  // Restore setTimeout
  global.setTimeout = originalSetTimeout;
});
it('sets accountsError to fallback message if thrown error is not an Error instance', async () => {
  const originalSetTimeout = global.setTimeout;
  global.setTimeout = (() => { throw 'not-an-error-object'; }) as unknown as typeof setTimeout;

  const store = create<AccountState>((set, get) => ({
    ...createAccountSlice(set, get, {} as unknown as StoreApi<AccountState>),
  }));

  await store.getState().fetchAccounts();

  const state = store.getState();
  expect(state.accountsError).toBe('Error loading accounts');
  expect(state.accountsLoading).toBe(false);

  global.setTimeout = originalSetTimeout;
});
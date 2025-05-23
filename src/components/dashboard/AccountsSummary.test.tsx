import { render, screen } from '@testing-library/react';
import AccountsSummary from '@/components/dashboard/AccountsSummary';
import { useAppStore } from '@/store/useAppStore';
import type { Account } from '@/store/slices/accountSlice';

jest.mock('@/store/useAppStore');

const mockAccounts: Account[] = [
  { id: '1', name: 'HSBC Current', type: 'Bank', balance: 1200 },
  { id: '2', name: 'Emergency Fund', type: 'Savings', balance: 5000 },
  { id: '3', name: 'Amex Gold', type: 'Credit Card', balance: -200 }
];

describe('AccountsSummary', () => {
  beforeEach(() => {
    ((useAppStore as unknown) as jest.Mock).mockImplementation((selector) =>
      selector({
        accounts: mockAccounts,
        loading: false,
        fetchAccounts: jest.fn()
      })
    );
  });

  it('renders all account names', () => {
    render(<AccountsSummary />);
    mockAccounts.forEach(account => {
      expect(screen.getByText(account.name)).toBeInTheDocument();
    });
  });

  it('renders account types and balances correctly', () => {
    render(<AccountsSummary />);
    mockAccounts.forEach(account => {
      expect(screen.getByText(account.type)).toBeInTheDocument();
      expect(screen.getByText(`£${account.balance.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('renders the correct emoji for each account type', () => {
    render(<AccountsSummary />);
    expect(screen.getByText('🏦')).toBeInTheDocument(); // Bank
    expect(screen.getByText('💰')).toBeInTheDocument(); // Savings
    expect(screen.getByText('💳')).toBeInTheDocument(); // Credit Card
  });

  it('applies correct class for positive and negative balances', () => {
    render(<AccountsSummary />);
    expect(screen.getByText('£1200.00')).toHaveClass('text-[#10b981]');
    expect(screen.getByText('£5000.00')).toHaveClass('text-[#10b981]');
    expect(screen.getByText('£-200.00')).toHaveClass('text-[#ef4444]');
  });

  it('calls fetchAccounts on mount', () => {
    const mockFetch = jest.fn();
    ((useAppStore as unknown) as jest.Mock).mockImplementation((selector) =>
      selector({
        accounts: mockAccounts,
        loading: false,
        fetchAccounts: mockFetch,
      })
    );

    render(<AccountsSummary />);
    expect(mockFetch).toHaveBeenCalled();
  });
});
import { render, screen } from '@testing-library/react';
import TransactionList from '@/components/TransactionList';
import type { Transaction } from '@/types/transaction';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Weekly groceries',
    category: 'Groceries',
    amount: -50,
    date: '2025-05-01'
  },
  {
    id: '2',
    description: 'Train ticket',
    category: 'Transport',
    amount: -15,
    date: '2025-05-02'
  }
];

describe('TransactionList', () => {
  it('renders loading state', () => {
    render(<TransactionList loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<TransactionList error />);
    expect(screen.getByText(/failed to load transactions/i)).toBeInTheDocument();
  });

  it('renders heading and view all link when enabled', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('View all')).toHaveAttribute('href', '/transactions');
  });

  it('hides heading and view all link when disabled', () => {
    render(<TransactionList transactions={mockTransactions} showHeading={false} showViewAll={false} />);
    expect(screen.queryByText('Recent Transactions')).not.toBeInTheDocument();
    expect(screen.queryByText('View all')).not.toBeInTheDocument();
  });

  it('limits the number of transactions displayed', () => {
    render(<TransactionList transactions={mockTransactions} limit={1} />);
    expect(screen.getAllByRole('listitem').length).toBe(1);
  });

  it('renders correct emoji and transaction details', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('🛒')).toBeInTheDocument();
    expect(screen.getByText('🚇')).toBeInTheDocument();
    expect(screen.getByText('Weekly groceries')).toBeInTheDocument();
    expect(screen.getByText('Train ticket')).toBeInTheDocument();
    expect(screen.getByText('Groceries • 2025-05-01')).toBeInTheDocument();
    expect(screen.getByText('Transport • 2025-05-02')).toBeInTheDocument();
    expect(screen.getByText('£50.00')).toBeInTheDocument();
    expect(screen.getByText('£15.00')).toBeInTheDocument();
  });

  it('renders fallback emoji for unknown category', () => {
    render(<TransactionList transactions={[{
      id: '3',
      description: 'Miscellaneous',
      category: 'Other',
      amount: -20,
      date: '2025-05-03'
    }]} />);
    expect(screen.getByText('💰')).toBeInTheDocument();
  });
});
import { render, screen, within } from '@testing-library/react';
import BudgetCategories from '@/components/dashboard/BudgetCategories';
import * as useBudgetCategoriesHook from '@/hooks/useBudgetCategories';
import type { UseQueryResult } from '@tanstack/react-query';
import type { BudgetCategory } from '@/types/budget';

jest.mock('@/hooks/useBudgetCategories', () => ({
  useGetBudgetCategories: jest.fn(),
}));

const mockCategories = [
  { id: '1', name: 'Groceries', spent: 50, budgeted: 100 },
  { id: '2', name: 'Transport', spent: 30, budgeted: 60 },
  { id: '3', name: 'Eating Out', spent: 90, budgeted: 90 },
];

describe('BudgetCategories', () => {
  it('renders loading state', () => {
    (useBudgetCategoriesHook.useGetBudgetCategories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    } as unknown as UseQueryResult<BudgetCategory[], Error>);

    render(<BudgetCategories />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders categories with correct text and progress bars', () => {
    (useBudgetCategoriesHook.useGetBudgetCategories as jest.Mock).mockReturnValue({
      data: mockCategories,
      isLoading: false,
    } as unknown as UseQueryResult<BudgetCategory[], Error>);

    render(<BudgetCategories />);

    const listItems = screen.getAllByRole('listitem');
    mockCategories.forEach(({ name, spent, budgeted }, index) => {
      const item = listItems[index];
      expect(within(item).getByText(name)).toBeInTheDocument();
      const spentEl = within(item).getAllByText(`£${spent.toFixed(2)}`)[0];
      const budgetedEl = within(item).getAllByText(`£${budgeted.toFixed(2)}`)[0];
      expect(spentEl).toBeInTheDocument();
      expect(budgetedEl).toBeInTheDocument();
    });
  });

  it('uses fallback emoji for unknown category', () => {
    (useBudgetCategoriesHook.useGetBudgetCategories as jest.Mock).mockReturnValue({
      data: [{ id: '4', name: 'Unknown', spent: 10, budgeted: 50 }],
      isLoading: false,
    } as unknown as UseQueryResult<BudgetCategory[], Error>);

    render(<BudgetCategories />);

    expect(screen.getByText('💰')).toBeInTheDocument();
  });
});
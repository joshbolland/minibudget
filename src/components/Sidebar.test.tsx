import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/Sidebar';

describe('Sidebar', () => {
  beforeEach(() => {
    render(<Sidebar />);
  });

  it('renders the application title', () => {
    expect(screen.getByText('minibudget')).toBeInTheDocument();
  });

  const links = [
    { text: 'Dashboard', href: '/dashboard' },
    { text: 'Budget', href: '/budget' },
    { text: 'Reports', href: '/reports' },
    { text: 'All Accounts', href: '/accounts' },
    { text: 'Transactions', href: '/transactions' },
    { text: 'Settings', href: '/settings' },
  ];

  test.each(links)('renders the %s link with correct href', ({ text, href }) => {
    const link = screen.getByRole('link', { name: text });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', href);
  });

  it('renders the Sign out button', () => {
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
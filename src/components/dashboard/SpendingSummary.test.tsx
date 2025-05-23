import { render, screen } from '@testing-library/react';
import SpendingSummary from '@/components/dashboard/SpendingSummary';

describe('SpendingSummary', () => {
  beforeEach(() => {
    render(<SpendingSummary />);
  });

  it('renders the section heading', () => {
    expect(screen.getByText(/Monthly Budget/i)).toBeInTheDocument();
  });

  it('displays the total budget correctly', () => {
    expect(screen.getByText('£1200.00')).toBeInTheDocument();
  });

  it('displays the spent amount correctly', () => {
    expect(screen.getByText('£768.20')).toBeInTheDocument();
  });

  it('displays the remaining amount correctly', () => {
    expect(screen.getByText('£431.80')).toBeInTheDocument();
  });

  it('displays the percentage spent in the chart', () => {
    expect(screen.getByText('64%')).toBeInTheDocument();
  });

  it('renders the progress donut SVG', () => {
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});
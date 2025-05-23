import { render, screen } from '@testing-library/react';
import { GreetingHeader } from '@/components/dashboard/GreetingHeader';

describe('GreetingHeader', () => {
  it('renders correctly', () => {
    render(<GreetingHeader firstName="Josh" today="Friday 23 May 2025" />);
    expect(screen.getByText("Hey Josh! Let's budget.")).toBeInTheDocument();
    expect(screen.getByText("Friday 23 May 2025")).toBeInTheDocument();
  });
});
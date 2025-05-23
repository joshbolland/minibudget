---
to: src/<%= dir %>/<%= name %>.test.tsx
---
import { render, screen } from '@testing-library/react';
import <%= name %> from '@/<%= dir %>/<%= name %>';

describe('<%= name %>', () => {
  it('renders correctly', () => {
    render(<<%= name %> />);
    expect(screen.getByText(/some text/i)).toBeInTheDocument();
  });
});
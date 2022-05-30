import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardCard from '.';

function TestIcon() {
  return <div data-testid="icon" />;
}

function TestChildren() {
  return <div data-testid="children" />;
}

describe('DashboardCard - unit test', () => {
  it('should render a card with all passed props', () => {
    render(
      <DashboardCard
        header="test header"
        icon={<TestIcon />}
        displayData="test data"
        unity="test unit"
      >
        <TestChildren />
      </DashboardCard>,
    );

    const header = screen.getByRole('heading', { level: 2, name: 'test header' });
    const icon = screen.getByTestId('icon');
    const children = screen.getByTestId('children');
    const displayData = screen.getByText('test data');
    const unity = screen.getByText('test unit');

    expect(header).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(children).toBeInTheDocument();
    expect(displayData).toBeInTheDocument();
    expect(unity).toBeInTheDocument();
  });
});

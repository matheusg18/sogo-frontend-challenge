import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';

describe('Button - unit test', () => {
  it('should render a button', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole<HTMLButtonElement>('button');
    expect(button).toHaveTextContent('Test Button');
  });

  it('should change button type according to type prop', () => {
    render(
      <>
        <Button>Test Button</Button>
        <Button type="button">Button button</Button>
        <Button type="submit">Button submit</Button>
        <Button type="reset">Button reset</Button>
      </>,
    );

    const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Test Button' });
    const buttonButton = screen.getByRole<HTMLButtonElement>('button', { name: 'Button button' });
    const buttonSubmit = screen.getByRole<HTMLButtonElement>('button', { name: 'Button submit' });
    const buttonReset = screen.getByRole<HTMLButtonElement>('button', { name: 'Button reset' });

    expect(button.type).toBe('button');
    expect(buttonButton.type).toBe('button');
    expect(buttonSubmit.type).toBe('submit');
    expect(buttonReset.type).toBe('reset');
  });

  it('should call handleClick function passed as prop', () => {
    const handleClick = jest.fn();

    render(<Button handleClick={handleClick}>Test Button</Button>);

    const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Test Button' });

    userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('should change button styles according to variant prop', () => {
    render(
      <>
        <Button>Test Button</Button>
        <Button variant="primary">Button primary</Button>
        <Button variant="filter">Button filter</Button>
      </>,
    );

    const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Test Button' });
    const buttonPrimary = screen.getByRole<HTMLButtonElement>('button', { name: 'Button primary' });
    const buttonFilter = screen.getByRole<HTMLButtonElement>('button', { name: 'Button filter' });

    expect(button).toHaveClass('button-component--primary');
    expect(buttonPrimary).toHaveClass('button-component--primary');
    expect(buttonFilter).toHaveClass('button-component--filter');
  });
});

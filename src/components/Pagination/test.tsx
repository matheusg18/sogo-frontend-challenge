import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Pagination from '.';
import { renderWithRouter } from '../../testUtils';

describe('Pagination - unit test', () => {
  it('should render a pagination element', () => {
    renderWithRouter(<Pagination itemsPerPage={10} totalItems={30} />);

    const pageButton1 = screen.getByRole<HTMLAnchorElement>('link', { name: '1' });
    const pageButton2 = screen.getByRole<HTMLAnchorElement>('link', { name: '2' });
    const pageButton3 = screen.getByRole<HTMLAnchorElement>('link', { name: '3' });
    const pageButton4 = screen.queryByRole('link', { name: '4' });

    expect(pageButton1).toBeInTheDocument();
    expect(pageButton2).toBeInTheDocument();
    expect(pageButton3).toBeInTheDocument();
    expect(pageButton4).not.toBeInTheDocument();

    expect(pageButton1.href).toMatch(/\?page=1/);
    expect(pageButton2.href).toMatch(/\?page=2/);
    expect(pageButton3.href).toMatch(/\?page=3/);
  });

  it('should highlight the actual page', () => {
    renderWithRouter(<Pagination itemsPerPage={10} totalItems={20} />);

    const pageButton1 = screen.getByRole<HTMLAnchorElement>('link', { name: '1' });
    const pageButton2 = screen.getByRole<HTMLAnchorElement>('link', { name: '2' });

    act(() => {
      userEvent.click(pageButton2);
    });

    expect(pageButton1.parentElement).not.toHaveClass('pagination__item--active');
    expect(pageButton2.parentElement).toHaveClass('pagination__item--active');
  });
});

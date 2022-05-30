import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '.';
import { renderWithRouter } from '../../testUtils';

describe('Navbar - unit test', () => {
  it('should render the nav links and logo', () => {
    renderWithRouter(<Navbar />);

    const dashboardlink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Dashboard' });
    const contractsToExpireLink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Lista de vencimentos' });
    const registerPersonLink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Cadastrar pessoa' });
    const registerContractLink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Cadastrar contrato' });
    const logo = screen.getByRole('img', { name: 'sogo logo' });

    expect(dashboardlink.href).toBe('http://localhost/');
    expect(contractsToExpireLink.href).toBe('http://localhost/contracts/to-expire');
    expect(registerPersonLink.href).toBe('http://localhost/register/person');
    expect(registerContractLink.href).toBe('http://localhost/register/contract');
    expect(logo).toBeInTheDocument();
  });

  it('should render mobile menu on small size devices', () => {
    renderWithRouter(<Navbar />);

    act(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
    });

    const hamburgButton = screen.getByTestId('mobile-menu-hamburg');
    expect(hamburgButton).toBeInTheDocument();

    act(() => {
      userEvent.click(hamburgButton);
    });

    const closeButton = screen.getByTestId('mobile-menu-close');
    expect(closeButton).toBeInTheDocument();
  });
});

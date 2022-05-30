import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: MemoryRouter }),
  };
};

export { renderWithRouter };

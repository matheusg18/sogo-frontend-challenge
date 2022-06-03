import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider as AlertProvider } from 'react-alert';
import Alert from '../components/Alert';

const renderWithReactAlert = (ui: ReactElement) => ({
  ...render(
    <AlertProvider template={Alert} position="bottom center" timeout={0}>
      {ui}
    </AlertProvider>,
  ),
});

export { renderWithReactAlert };

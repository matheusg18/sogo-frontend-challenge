import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as uuid from 'uuid';
import moment from 'moment';
import RegisterContract from './index';
import * as services from '../../services';

jest.mock('uuid');

describe('RegisterContract - unit test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should register a contract', async () => {
    (uuid.v4 as jest.Mock).mockReturnValue('fakeuuid');

    render(<RegisterContract />);

    const registrationDateInput = screen.getByPlaceholderText('Data de registro');
    const dueDateInput = screen.getByPlaceholderText('Data de vencimento');
    const personCpfInput = screen.getByPlaceholderText('CPF da pessoa prestadora de serviço');
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' });

    await act(() => {
      userEvent.type(registrationDateInput, '20/02/2020');
      userEvent.type(dueDateInput, '20/02/2023');
      userEvent.type(personCpfInput, '14516861020');
    });

    await act(() => {
      userEvent.click(submitButton);
    });

    expect(services.getSavedContracts()).toStrictEqual([
      {
        contractNumber: 'fakeuuid',
        registrationDate: moment('20/02/2020', 'DD/MM/YYYY').toDate(),
        dueDate: moment('20/02/2023', 'DD/MM/YYYY').toDate(),
        personCpf: '14516861020',
      },
    ]);
  });
});

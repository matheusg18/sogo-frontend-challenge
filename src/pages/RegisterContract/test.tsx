import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import RegisterContract from './index';
import * as services from '../../services';
import { genContractNumber } from '../../utils/genContractNumber';
import { renderWithReactAlert } from '../../testUtils';

jest.mock('../../utils/genContractNumber');

describe('RegisterContract - unit test', () => {
  beforeAll(() => {
    // seed cpf
    localStorage.setItem('@sogo/savedPersons', JSON.stringify([{ cpf: '14516861020' }]));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should register a contract', async () => {
    (genContractNumber as jest.Mock).mockReturnValue('0123456789');

    renderWithReactAlert(<RegisterContract />);

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
        contractNumber: '0123456789',
        registrationDate: moment('20/02/2020', 'DD/MM/YYYY').toDate(),
        dueDate: moment('20/02/2023', 'DD/MM/YYYY').toDate(),
        personCpf: '14516861020',
      },
    ]);
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as uuid from 'uuid';
import moment from 'moment';
import RegisterPerson from './index';
import * as services from '../../services';
import { renderWithReactAlert } from '../../testUtils';

jest.mock('uuid');

describe('RegisterPerson - unit test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should register a person', async () => {
    (uuid.v4 as jest.Mock).mockReturnValue('fakeuuid');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        logradouro: 'Rua do Jest',
        uf: 'JT',
        localidade: 'Mocha',
        bairro: 'Chai',
      }),
    });

    renderWithReactAlert(<RegisterPerson />);

    const firstNameInput = screen.getByPlaceholderText('Nome');
    const lastNameInput = screen.getByPlaceholderText('Sobrenome');
    const cpfInput = screen.getByPlaceholderText('CPF');
    const birthDateInput = screen.getByPlaceholderText('Data de nascimento');
    const cepInput = screen.getByPlaceholderText('CEP');
    const streetInput = screen.getByPlaceholderText('Rua');
    const numberInput = screen.getByPlaceholderText('Número');
    const stateInput = screen.getByPlaceholderText('Estado');
    const cityInput = screen.getByPlaceholderText('Cidade');
    const districtInput = screen.getByPlaceholderText('Bairro');
    const complementInput = screen.getByPlaceholderText('Complemento');
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' });

    await act(() => {
      userEvent.type(firstNameInput, 'Matheus');
      userEvent.type(lastNameInput, 'Santos');
      userEvent.type(cpfInput, '14516861020');
      userEvent.type(birthDateInput, '20/02/2000');
      userEvent.type(cepInput, '53190230');
      userEvent.type(numberInput, '500');
    });

    expect(streetInput).toHaveValue('Rua do Jest');
    expect(stateInput).toHaveValue('JT');
    expect(cityInput).toHaveValue('Mocha');
    expect(districtInput).toHaveValue('Chai');
    expect(complementInput).toHaveValue('');

    await act(() => {
      userEvent.click(submitButton);
    });

    expect(services.getSavedPersons()).toStrictEqual([
      {
        id: 'fakeuuid',
        cpf: '14516861020',
        firstName: 'Matheus',
        lastName: 'Santos',
        birthDate: moment('20/02/2000', 'DD/MM/YYYY').toDate(),
        address: {
          cep: '53190230',
          state: 'JT',
          city: 'Mocha',
          street: 'Rua do Jest',
          number: '500',
          district: 'Chai',
          complement: '',
        },
      },
    ]);
  });
});

import { ICepInfo } from '../interfaces';

const fetchInfoFromCep = async (cep: string): Promise<ICepInfo> => {
  const endpoint = `https://viacep.com.br/ws/${cep}/json`;

  const result = await fetch(endpoint);
  const info = await result.json();

  return {
    cep,
    state: info.uf,
    city: info.localidade,
    district: info.bairro,
    street: info.logradouro,
  };
};

export { fetchInfoFromCep };

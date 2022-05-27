export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: Date;
  address: {
    cep: string;
    street: string;
    number: string;
    state: string;
    city: string;
    district: string;
    complement: string;
  };
}

export interface IRegisterPersonFormValues {
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: string;
  cep: string;
  street: string;
  number: string;
  state: string;
  city: string;
  district: string;
  complement: string;
}

export interface IRegisterContractFormValues {
  registrationDate: string;
  dueDate: string;
  personCpf: string;
}

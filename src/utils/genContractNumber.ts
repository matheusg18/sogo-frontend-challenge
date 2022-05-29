// alternative to uuid
const genContractNumber = (): string => (
  ((Math.random() * 8 + 1) * 10000).toFixed(0) + ((Math.random() * 8 + 1) * 10000).toFixed(0)
);

export { genContractNumber };

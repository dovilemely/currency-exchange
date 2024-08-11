export class ValidationError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const validateBaseAmount = (amount: unknown): void => {
  if (!amount) {
    throw new ValidationError(400, "Amount is required");
  }
  if (!Number.isInteger(parseInt(amount?.toString() || ""))) {
    throw new ValidationError(400, "Base amount should be an integer");
  }
};

const isSupportedCurrency = (currency: unknown): boolean => {
  const supportedCurrencies = ["USD", "EUR", "GBP", "ILS"];
  return supportedCurrencies.indexOf(currency?.toString() || "") > -1;
};

export const validateBaseCurrency = (baseCurrency: unknown): void => {
  if (!baseCurrency) {
    throw new ValidationError(400, "Base currency is required");
  }
  if (!isSupportedCurrency(baseCurrency)) {
    throw new ValidationError(400, "Unsupported base currency");
  }
};

export const validateQuoteCurrency = (quoteCurrency: unknown): void => {
  if (!quoteCurrency) {
    throw new ValidationError(400, "Quote currency is required");
  }
  if (!isSupportedCurrency(quoteCurrency)) {
    throw new ValidationError(400, "Unsupported quote currency");
  }
};

import { supportedCurrencies } from "../constants/supportedCurrencies";

export class ValidationError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const validateBaseAmount = (amount: unknown): void => {
  if (!amount) {
    throw new ValidationError(400, "Query parameter of baseAmount is required");
  }

  if (!Number.isInteger(parseInt(amount?.toString() || ""))) {
    throw new ValidationError(
      400,
      "Query parameter of baseAmount should be an integer",
    );
  }
};

const isSupportedCurrency = (currency: string): boolean => {
  return supportedCurrencies.includes(currency);
};

export const validateCurrency = (
  currency: unknown,
  currencyParameterName: string,
): void => {
  if (!currency) {
    throw new ValidationError(
      400,
      `Query parameter of ${currencyParameterName} is required`,
    );
  }

  if (typeof currency !== "string") {
    throw new ValidationError(
      400,
      `Query parameter of ${currencyParameterName} should be string`,
    );
  }

  if (!isSupportedCurrency(currency)) {
    throw new ValidationError(
      400,
      `Value of ${currencyParameterName} is not supported`,
    );
  }
};

import { QuoteResponse } from "../types/quoteResponse";

export const calculateQuoteCurrency = (
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number,
): QuoteResponse => {
  return { exchangeRate: 1, quoteAmount: 2 };
};

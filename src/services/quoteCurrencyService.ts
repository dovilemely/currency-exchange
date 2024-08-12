import { roundingDegree } from "../constants/roundingDegree";
import { QuoteResponse } from "../types/quoteResponse";
import { getMockedQuoteCurrencyExchangeRate } from "./mockedExchangeRateService";

export const calculateQuoteCurrency = (
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number,
): QuoteResponse => {
  const exchangeRate = getMockedQuoteCurrencyExchangeRate(quoteCurrency);
  const quoteAmount = Number(
    (baseAmount * exchangeRate).toFixed(roundingDegree),
  );

  return { exchangeRate, quoteAmount };
};

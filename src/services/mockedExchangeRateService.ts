import { rawTestExchangeRatesUSD } from "../testData/testExchangeRatesUSD";
import { ExchangeRatesResponse } from "../types/exchangeRateResponse";

export const getMockedQuoteCurrencyExchangeRate = (
  quoteCurrency: string,
): number => {
  return rawTestExchangeRatesUSD.rates[quoteCurrency];
};

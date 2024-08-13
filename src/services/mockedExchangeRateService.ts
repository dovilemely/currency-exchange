import { rawTestExchangeRatesUSD } from "../testData/testExchangeRatesUSD";

export const getMockedUSDExchangeRates = (): Record<string, number> => {
  return rawTestExchangeRatesUSD.rates;
};

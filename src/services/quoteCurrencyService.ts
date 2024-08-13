import { roundingDegree } from "../constants/roundingDegree";
import { QuoteResponse } from "../types/quoteResponse";
import { LRUCacheService } from "./lruCacheService";
import { getMockedUSDExchangeRates } from "./mockedExchangeRateService";

const lruCacheService = new LRUCacheService(10);

export const calculateQuoteCurrency = (
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number,
): QuoteResponse => {
  const cachedExchangeRates = lruCacheService.get(baseCurrency);

  let exchangeRate = cachedExchangeRates?.[quoteCurrency];

  if (!exchangeRate) {
    const exchangeRates = getMockedUSDExchangeRates();

    lruCacheService.put(baseCurrency, exchangeRates);

    exchangeRate = exchangeRates[quoteCurrency];
  }

  const quoteAmount = Number(
    (baseAmount * exchangeRate).toFixed(roundingDegree),
  );

  return { exchangeRate, quoteAmount };
};

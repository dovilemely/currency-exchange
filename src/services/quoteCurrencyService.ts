import { roundingDegree } from "../constants/roundingDegree";
import { QuoteResponse } from "../types/quoteResponse";
import { LRUCacheService } from "./lruCacheService";
import { getMockedUSDExchangeRates } from "./mockedExchangeRateService";
import { getThirdPartyExchangeRates } from "./thirdPartyApiService";

const lruCacheService = new LRUCacheService(10);

const getExchangeRate = async (
  baseCurrency: string,
  quoteCurrency: string,
): Promise<number> => {
  const cachedExchangeRates = lruCacheService.get(baseCurrency);

  let exchangeRate = cachedExchangeRates?.[quoteCurrency];

  if (!exchangeRate) {
    const environment = process.env.NODE_ENV;
    let exchangeRates: Record<string, number>;

    if (environment === "dev") {
      exchangeRates = getMockedUSDExchangeRates();
    } else {
      exchangeRates = await getThirdPartyExchangeRates(baseCurrency);
    }
    lruCacheService.put(baseCurrency, exchangeRates);

    exchangeRate = exchangeRates[quoteCurrency];
  }

  return exchangeRate;
};

export const calculateQuoteCurrency = async (
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number,
): Promise<QuoteResponse> => {
  const exchangeRate = await getExchangeRate(baseCurrency, quoteCurrency);

  const quoteAmount = Number(
    (baseAmount * exchangeRate).toFixed(roundingDegree),
  );

  return { exchangeRate, quoteAmount };
};

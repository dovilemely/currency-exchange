import axios from "axios";
import { ExchangeRatesResponse } from "../types/exchangeRateResponse";

export const getThirdPartyExchangeRates = async (
  baseCurrency: string,
): Promise<Record<string, number>> => {
  let rates;
  try {
    const axiosResponse = await axios.get<ExchangeRatesResponse>(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
    );
    rates = axiosResponse.data.rates;
  } catch (error) {
    throw new Error("Unavailable third party exchange rate provider");
  }
  return rates!;
};

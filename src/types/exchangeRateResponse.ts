export interface ExchangeRatesResponse {
    provider: string;
    WARNING_UPGRADE_TO_V6: string;
    terms: string;
    time_last_updated: number;
    base: string;
    date: string;
    rates: Record<string, number>;
  }
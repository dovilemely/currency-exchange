import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
  ValidationError,
  validateBaseAmount,
  validateCurrency,
} from "./validators";
import { calculateQuoteCurrency } from "./services/quoteCurrencyService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server1");
});

app.get("/quote", async (req: Request, res: Response) => {
  const {
    baseCurrency: rawBaseCurrency,
    quoteCurrency: rawQuoteCurrency,
    baseAmount: rawAmount,
  } = req.query;
  try {
    const amount = validateBaseAmount(rawAmount);
    const baseCurrency = validateCurrency(rawBaseCurrency, "baseCurrency");
    const quoteCurrency = validateCurrency(rawQuoteCurrency, "quoteCurrency");

    const result = await calculateQuoteCurrency(
      baseCurrency,
      quoteCurrency,
      amount,
    );

    res.send(result);
  } catch (error) {
    let status = 500;
    let errorMessage = "Server error";

    if (error instanceof ValidationError) {
      status = error.status;
      errorMessage = error.message;
    }
    res.status(status).send(errorMessage);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

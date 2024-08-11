import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
  ValidationError,
  validateBaseAmount,
  validateBaseCurrency,
  validateQuoteCurrency,
} from "./validators";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server1");
});

app.get("/quote", (req: Request, res: Response) => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.query;
  try {
    validateBaseAmount(baseAmount);
    validateBaseCurrency(baseCurrency);
    validateQuoteCurrency(quoteCurrency);
    res.send({ baseCurrency, quoteCurrency, baseAmount });
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

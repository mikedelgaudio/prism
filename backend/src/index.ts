import cors from "cors";
import dotenv from "dotenv";
import express, { type Express } from "express";
import helmet from "helmet";
import { logger } from "./middleware/logger.middleware";
import { configRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const allowList = ["http://localhost:5173", process.env?.ALLOWURL ?? ""];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowList.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(logger);
const PORT = process.env?.PORT ?? 3001;

configRoutes(app);

app.listen(PORT, () => {
  console.info(`[EXPRESS] Successful running on port: ${PORT}`);
});

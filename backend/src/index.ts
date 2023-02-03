import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import { configRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const allowList = ["http://localhost:5173", process.env?.ALLOWURL ?? ""];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
const PORT = process.env?.PORT ?? 3001;

configRoutes(app);

app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`[EXPRESS] Successful running on port: ${PORT}`);
});

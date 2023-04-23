import cors from "cors";
import dotenv from "dotenv";
import express, { type Express } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { initFirebase } from "./config/firebase.config";
import { initGSheet } from "./config/google.config";
import { initRedis } from "./config/redis.config";
import { saveNightlyTasks } from "./data/settings/tasks.data";
import { logger } from "./middleware/logger.middleware";
import { configRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const allowList = process.env?.CORS_URLS?.split(",") ?? [];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowList.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, blocked...",
});

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(logger);

const PORT = 3001;
const VERSION = "0.5.1";

configRoutes(app);

app.listen(PORT, async () => {
  await Promise.allSettled([
    initFirebase(),
    initGSheet(),
    initRedis(),
    saveNightlyTasks(),
  ]);

  console.info(
    `[EXPRESS] Successful server v${VERSION} running on port: ${PORT}`,
  );
});

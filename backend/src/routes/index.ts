import type { Express, Request, Response } from "express";
import { dashboardsRouter } from "./dashboards.route";
import { profileRouter } from "./profile.route";
import { settingsRouter } from "./settings.route";

export const configRoutes = (app: Express): void => {
  app.use("/dashboards", dashboardsRouter);
  app.use("/profile", profileRouter);
  app.use("/settings", settingsRouter);
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
  });
};

import { Express, Request, Response } from "express";
import { dashboardsRouter } from "./dashboards.route";

export const configRoutes = (app: Express) => {
  app.use("/dashboards", dashboardsRouter);
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
  });
};

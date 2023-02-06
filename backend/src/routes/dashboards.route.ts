import { Router, type Request, type Response } from "express";
import { computeSheet } from "../data/sheet.data";

import { checkAuth } from "../middleware/firebase.middleware";

export const dashboardsRouter: Router = Router();

dashboardsRouter.get("/day", checkAuth, async (req: Request, res: Response) => {
  try {
    const token = req.headers.token as string;
    if (token === undefined) throw new Error();

    const { fetchLatestTimestamps } = await computeSheet(token);
    res.status(200).json(fetchLatestTimestamps);
  } catch (e) {
    res.status(500).json({ error: "Error" });
  }
});

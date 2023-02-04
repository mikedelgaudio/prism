import { Router, type Request, type Response } from "express";
import { computeSheet } from "../data/sheet.data";

import { checkAuth } from "../middleware/firebase.middleware";

export const dashboardsRouter: Router = Router();

dashboardsRouter.get("/day", checkAuth, async (req: Request, res: Response) => {
  try {
    const { getRowsOfA } = await computeSheet();
    res.status(200).json(getRowsOfA);
  } catch (e) {
    res.status(500).json({ error: "Error" });
  }
});

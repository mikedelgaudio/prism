import { Router, type Request, type Response } from "express";
import { admin } from "../config/firebase.config";
import { computeSheetMVP } from "../data/sheet.mvp.data";
import { computeWeeks, getWeeklyUploads } from "../data/week.mvp.data";

import { checkAuth } from "../middleware/firebase.middleware";

export const dashboardsRouter: Router = Router();

dashboardsRouter.get(
  "/calculate",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.token as string;
      if (!token) throw new Error();
      const response = await computeSheetMVP(token);
      res.status(200).json(response);
    } catch (e: any) {
      res.status(500).json({ status: "FAIL", errors: [{ sheet: e?.message }] });
    }
  },
);

dashboardsRouter.get(
  "/weeks",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.token as string;
      if (!token) throw new Error();
      const { uid } = await admin.auth().verifyIdToken(token);
      const response = await computeWeeks(uid);
      if (response.status !== "OK") throw new Error("Failed to update weekly");
      const weeklyUploads = await getWeeklyUploads(uid);
      res.status(200).json({ status: "OK", data: weeklyUploads });
    } catch (e: any) {
      res.status(500).json({ status: "FAIL", errors: [{ sheet: e?.message }] });
    }
  },
);

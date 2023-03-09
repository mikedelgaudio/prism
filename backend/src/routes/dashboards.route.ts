import { Router, type Response } from "express";
import { param, validationResult } from "express-validator";
import { computeSheetMVP } from "../data/sheet.mvp.data";
import { getWeeklySideData } from "../data/weeks/week-breakdown.data";
import { computeWeeks, getWeeklyUploads } from "../data/weeks/week.mvp.data";
import type { RequestWithAuth } from "../middleware";

import { checkAuth } from "../middleware/firebase.middleware";

export const dashboardsRouter: Router = Router();

dashboardsRouter.get(
  "/calculate",
  checkAuth,
  async (req: RequestWithAuth, res: Response) => {
    try {
      const uid = req.uid as string;
      const response = await computeSheetMVP(uid);
      res.status(200).json(response);
    } catch (e: any) {
      res.status(500).json({ status: "FAIL", errors: [{ sheet: e?.message }] });
    }
  },
);

dashboardsRouter.get(
  "/weeks",
  checkAuth,
  async (req: RequestWithAuth, res: Response) => {
    try {
      const uid = req.uid as string;
      const response = await computeWeeks(uid);
      if (response.status !== "OK") throw new Error("Failed to update weekly");
      const weeklyUploads = await getWeeklyUploads(uid);
      res.status(200).json({ status: "OK", data: weeklyUploads });
    } catch (e: any) {
      res.status(500).json({ status: "FAIL", errors: [{ sheet: e?.message }] });
    }
  },
);

dashboardsRouter.get(
  "/week/:weekNumber/:year/:sideNumber",
  [param(["weekNumber", "year", "sideNumber"]).isNumeric()],
  checkAuth,
  async (req: RequestWithAuth, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ status: "FAIL", errors: errors.array() });

      const uid = req.uid as string;
      const { weekNumber, year, sideNumber } = req.params;

      const response = await getWeeklySideData(
        uid,
        weekNumber,
        year,
        sideNumber,
      );

      res.status(200).json({ status: "OK", data: response });
    } catch (e: any) {
      res.status(500).json({ status: "FAIL", errors: [{ sheet: e?.message }] });
    }
  },
);

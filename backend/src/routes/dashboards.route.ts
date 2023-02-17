import { Router, type Request, type Response } from "express";
import { computeSheetMVP } from "../data/sheet.mvp.data";

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
  "/days",
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

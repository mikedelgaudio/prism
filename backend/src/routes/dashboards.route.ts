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
      const { status } = await computeSheetMVP(token);
      res.status(200).json(status);
    } catch (e) {
      res.status(500).json({ status: "FAIL", errors: [e] });
    }
  },
);

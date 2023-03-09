import { Router, type Response } from "express";
import type { RequestWithAuth } from "../middleware";

import { checkAuth } from "../middleware/firebase.middleware";

export const settingsRouter: Router = Router();

settingsRouter.get(
  "/tasks",
  checkAuth,
  async (req: RequestWithAuth, res: Response) => {
    try {
      // const uid = req.uid as string;
      res.status(200).json({ status: "OK" });
    } catch (e: any) {
      res
        .status(500)
        .json({ status: "FAIL", errors: [{ message: e?.message }] });
    }
  },
);

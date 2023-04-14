import { Router, type Response } from "express";
import type { RequestWithAuth } from "../models/express";

import { saveToday } from "../data/settings/tasks.data";
import { checkAuth } from "../middleware/firebase.middleware";

export const settingsRouter: Router = Router();

settingsRouter.post(
  "/update-tasks",
  checkAuth,
  async (req: RequestWithAuth, res: Response) => {
    try {
      // Update the current day's task names if exists
      // When a new task update occurs
      const uid = req.uid as string;
      const update = await saveToday(uid);
      res.status(update.status).json({ status: "OK" });
    } catch (e: any) {
      res
        .status(500)
        .json({ status: "FAIL", errors: [{ message: e?.message }] });
    }
  },
);

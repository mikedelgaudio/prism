import { Router, type Request, type Response } from "express";

import { checkAuth } from "../middleware/firebase.middleware";

export const dashboardsRouter: Router = Router();

dashboardsRouter.get("/day", checkAuth, async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (e) {
    res.status(500).json({ error: "Error" });
  }
});

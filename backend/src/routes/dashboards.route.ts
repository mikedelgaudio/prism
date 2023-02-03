import express, { Request, Response, Router } from "express";

import { checkAuth } from "../middleware/firebase.middleware";

export const dashboardsRouter: Router = express.Router();

dashboardsRouter.get("/day", checkAuth, async (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});

import type { NextFunction, Request, Response } from "express";
import { admin } from "../config/firebase.config";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (req.headers.token === undefined) throw new Error("Unauthorized");
    const token = req.headers.token as string;
    await admin.auth().verifyIdToken(token);
    next();
  } catch (e) {
    res.status(403).json({ error: "Unauthorized" });
  }
};

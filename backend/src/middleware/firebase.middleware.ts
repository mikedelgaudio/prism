import type { NextFunction, Response } from "express";
import { admin } from "../config/firebase.config";
import type { RequestWithAuth } from "../models/express";

export const checkAuth = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (!req.headers.token) throw new Error("Unauthorized");
    const token = req.headers.token as string;
    const { uid } = await admin.auth().verifyIdToken(token);
    req.uid = uid;
    next();
  } catch (e) {
    res.status(403).json({ error: "Unauthorized" });
  }
};

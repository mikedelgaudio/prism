import type { NextFunction, Request, Response } from "express";
import { admin } from "../config/firebase.config";

export interface IAuthReq extends Request {
  headers: any;
}

export const checkAuth = async (
  req: IAuthReq,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (req.headers.token !== undefined) throw new Error("Unauthorized");
    const token = req.headers.token;
    await admin.auth().verifyIdToken(token);
    next();
  } catch (e) {
    res.status(403).json(e);
  }
};

import type { NextFunction, Request, Response } from "express";

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const authStatus =
    req.headers.token === undefined
      ? "Non-Authenticated User"
      : "Token-Attempted User";
  const log = `[${new Date().toUTCString()}]: ${req.method} ${
    req.originalUrl
  } (${authStatus})`;
  console.info(log);
  next();
};

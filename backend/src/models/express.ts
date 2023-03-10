import type { Request } from "express";

export interface RequestWithAuth extends Request {
  uid?: string;
}

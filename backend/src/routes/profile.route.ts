import { Router, type Request, type Response } from "express";
import { body, validationResult } from "express-validator";

import { checkAuth } from "../middleware/firebase.middleware";

export const profileRouter: Router = Router();

/**
 * Return user firestore profile
 */
profileRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const token = req.headers.token as string;
    if (!token) throw new Error();
    res.status(200).json({ status: "OK" });
  } catch (e) {
    res.status(500).json({ status: "FAIL", errors: [e] });
  }
});

/**
 * Reset user's password from unauth screenset
 */
profileRouter.post(
  "/unauth-reset",
  body("email").isEmail(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ status: "FAIL", errors: errors.array() });

      const { email } = req.body;
      const { unauthResetPassword } = await import("../data/profile/auth.data");
      await unauthResetPassword(email);

      return res.status(200).json({ status: "OK" });
    } catch (e) {
      res.status(500).json({ status: "FAIL", errors: [e] });
    }
  },
);

profileRouter.patch(
  "/disconnect",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.token as string;
      if (!token) throw new Error();
      res.status(200).json({ status: "OK" });
    } catch (e) {
      res.status(500).json({ status: "FAIL", errors: [e] });
    }
  },
);

profileRouter.patch(
  "/connect",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.token as string;
      if (!token) throw new Error();
      res.status(200).json({ status: "OK" });
    } catch (e) {
      res.status(500).json({ status: "FAIL", errors: [e] });
    }
  },
);

profileRouter.delete("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const token = req.headers.token as string;
    if (!token) throw new Error();
    res.status(200).json({ status: "OK" });
  } catch (e) {
    res.status(500).json({ status: "FAIL", errors: [e] });
  }
});

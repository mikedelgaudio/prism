import { admin } from "../../config/firebase.config";

const unauthResetPassword = async (email: string): Promise<void> => {
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    const nodemailer = await import("nodemailer");

    const port = Number(process.env?.EMAIL_PORT ?? "0");
    const secure = process.env?.EMAIL_SECURE === "true";

    const transporter = nodemailer.createTransport({
      host: process.env?.EMAIL_SERVER,
      port,
      secure,
      auth: {
        user: process.env?.EMAIL_USER,
        pass: process.env?.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "noreply@sg.prismproductivity.com",
      to: email,
      subject: "Password Reset Request Link - Prism Productivity",
      text: `Hello! To reset your password use this link: ${link}. If you did not request this link, ensure your password is strong and ignore this email.`,
    });
  } catch (e: any) {
    if (e?.errorInfo?.code !== "auth/email-not-found")
      throw new Error("Failed to send email");
  }
};

export { unauthResetPassword };

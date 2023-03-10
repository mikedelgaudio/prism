import { admin } from "../../config/firebase.config";

const unauthResetPassword = async (email: string): Promise<void> => {
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env?.EMAIL_SERVER,
      port: 465,
      secure: true,
      auth: {
        user: process.env?.EMAIL_USER,
        pass: process.env?.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "noreply@prismproductivity.com",
      to: email,
      subject: "Password Reset Request Link - Prism Productivity",
      text: `Hello,
      
      To reset your password use this link: ${link}. 
      
      If you did not request this link, ensure your password is strong and ignore this email.`,
    });
  } catch (e: any) {
    if (e?.errorInfo?.code !== "auth/email-not-found")
      throw new Error("Failed to send email");
  }
};

export { unauthResetPassword };

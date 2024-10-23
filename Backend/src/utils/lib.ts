import jwt from "jsonwebtoken";
import env from "../config/env";
import nodemailer from "nodemailer";

export const emailSender = async (email: string, userId: string) => {
  const JWT_SECRET = env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ id: userId, email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const resetPasswordUrl = `https://fitness-tracker-liard.vercel.app/auth/resetPassword?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d64e499e7cdfa1",
      pass: "5132d02fed6a2b",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Dear User,
    We received a request to reset your password. Please click the link below to set a new password:
    ${resetPasswordUrl}
    If you did not request a password reset, please disregard this email.
    Thank you,
    MyFitPal`,
    html: `<p>Dear User,</p>
    <p>We received a request to reset your password. Please click the link below to set a new password:</p>
    <a href="${resetPasswordUrl}">Reset Password</a>
    <p>If you did not request a password reset, please disregard this email.</p>
    <p>Thank you,</p>
    <p>MyFitPal</p>`,
  };

  await transporter.sendMail(mailOptions);
};

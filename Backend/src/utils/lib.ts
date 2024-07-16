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

  const resetPasswordUrl = `http://localhost:3000/forgotPassword/resetPassword?token=${token}`;

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
    subject: "Reset Your Password",
    html: `To reset your password, please click the link below: <br/> <hr/> <a href="${resetPasswordUrl}">click here</a> <br/> <hr/> If you did not request a password reset, please ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};

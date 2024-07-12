import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female"]),
  country: z.string(),
});

import { z } from "zod";

export const userRegisterSchema = z.object({
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

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const refreshTokenSchema = z.object({
  token: z.string(),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
  });

export const personalizationSchema = z.object({
  weight: z.string().regex(/^\d{1,2}kg$/, {
    message: "Weight must be in the format '5kg'.",
  }),
  height: z.string().regex(/^\d{1,2}'\d{1,2}"$/, {
    message: "Height must be in the format 5'11\"",
  }),
  city: z.string().min(1, { message: "City is required" }),
  profileImage: z.any().optional(),
});

export const workoutSchema = z.object({
  date: z.string({
    message: "Invalid date format",
  }),
  type: z.string().min(1, { message: "Workout type is required" }).optional(),
  speed: z
    .number()
    .min(0)
    .max(99, { message: "Speed cannot be more than 99" })
    .optional(),
  effort: z.string().optional(),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" })
    .optional(),
  calories: z
    .number()
    .int()
    .min(0, { message: "Calories must be a non-negative integer" }),
});

export const goalSchema = z.object({
  description: z.string().min(1, { message: "Description cannot be empty" }),
  targetDate: z.string({ message: "Target date cannot be in the past" }),
  achieved: z.boolean().default(false),
  targetCalories: z
    .number()
    .min(1, { message: "Target calories must be at least 1 calorie" }),
  currentCalories: z
    .number()
    .min(0, { message: "Current calories cannot be negative" })
    .default(0),
});

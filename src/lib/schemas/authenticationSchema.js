import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export const signUpSchema = z.object({
  displayName: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Name is too short" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

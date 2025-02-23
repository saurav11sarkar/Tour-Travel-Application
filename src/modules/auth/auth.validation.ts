import { z } from "zod";

const authSchema = z.object({
  email: z.string({ required_error: "Email is requried" }).email(),
  password: z.string(),
});

const forgetPassword = z.object({
  email: z.string({ required_error: "Email is requried" }).email(),
});

const resetPasswordSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "please correct id" }),
    token: z.string(),
    password: z.string(),
  }),
});

export const authValidation = {
  authSchema,
  forgetPassword,
  resetPasswordSchema,
};

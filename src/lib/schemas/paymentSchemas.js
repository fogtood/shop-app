import { z } from "zod";

export const baseSchema = z.object({
  paymentMethod: z.enum(["credit-card", "paypal"]),
});

export const creditCardSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Full Name is required" })
    .min(3, { message: "Name is too short" }),
  cardNumber: z
    .string()
    .nonempty({ message: "Card Number is required" })
    .length(16, { message: "Card Number must be 16 digits" }),
  expiryDate: z
    .string()
    .nonempty({ message: "Expiry Date is required" })
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Invalid Expiry Date",
    }),
  cvv: z
    .string()
    .nonempty({ message: "CVC is required" })
    .length(3, { message: "CVC must be 3 digits" }),
});

export const getPaymentSchema = (paymentMethod) => {
  if (paymentMethod === "credit-card") {
    return baseSchema.and(creditCardSchema);
  }
  return baseSchema;
};

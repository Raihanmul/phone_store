import z from "zod";

export const createProductSchema = z.object({
  user_id: z.number({ invalid_type_error: "User ID must be a number" }),
  name: z.string().min(5, "Name must be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Minimum price is 1"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Minimum stock is 0"),
});

export const updateProductSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").optional(),
  descriptions: z
    .string()
    .min(10, "Descriptions must be at least 10 characters long")
    .optional(),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Minimum price is 1")
    .optional(),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Minimum stock is 0")
    .optional(),
});

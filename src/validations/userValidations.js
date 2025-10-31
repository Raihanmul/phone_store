import z from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "Fullname must be at least 3 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "user"], "Role must be either 'admin' or 'user'"),
});

export const updateUserSchema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be at least 3 characters long")
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .refine((s) => s.includes(" "), "Username cannot contain spaces")
    .optional(),
  email: z.email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  phone_number: z
    .string()
    .regex(/^0\d{9, 14}$/, "Invalid Phone Number")
    .optional(),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(10, "Minimun age is 10")
    .max(100, "Maximum age is 100")
    .optional(),
});

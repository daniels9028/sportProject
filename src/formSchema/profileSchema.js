import * as z from "zod";

export const profileSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  name: z.string().nonempty("Name is required"),
  password: z.string(),
  c_password: z.string(),
  phone_number: z.coerce.number(),
});

import * as z from "zod";

export const profileSchema = z.object({
  name: z.string().nonempty("Name is required"),
  password: z.string(),
  c_password: z.string(),
  phone_number: z.string(),
});

import * as z from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .nonempty("Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .nonempty("Description is required"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .nonempty("Address is required"),
  slot: z.coerce.number().min(1, "Slot must be at least 1"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  activity_date: z.string().nonempty("Activity date is required"),
  start_time: z.string().nonempty("Start time is required"),
  end_time: z.string().nonempty("End time is required"),
  map_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  sport_category_id: z.number(),
  city_id: z.number(),
});

export const defaultValues = {
  title: "",
  description: "",
  slot: 0,
  price: 0,
  address: "",
  activity_date: "",
  start_time: "",
  end_time: "",
  map_url: "",
  sport_category_id: "",
  city_id: "",
};

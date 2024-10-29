import { z } from "zod";

export const AddDDL = z.object({
  cardId: z.string(),
  ddl: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
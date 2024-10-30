// schema.ts
import { z } from "zod";

export const CreateCard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }),
  boardId: z.string(),
  listId: z.string(),
  importance: z.enum(["UNDEFINED", "LOW", "MEDIUM", "HIGH"]).default("UNDEFINED"), 
});
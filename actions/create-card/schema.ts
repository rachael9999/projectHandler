
import { z } from "zod";

export const CreateCard = z.object({

  title: z.string(),

  boardId: z.string(),

  listId: z.string(),

  importance: z.enum(["UNDEFINED", "LOW", "MEDIUM", "HIGH"]),

});

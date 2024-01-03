import { z } from "zod";

export const CreateToDo = z.object({
  id: z.string(),
  boardId: z.string(),
  toDo: z.string(),
});

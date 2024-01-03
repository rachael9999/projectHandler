import { z } from "zod";

export const UpdateToDo = z.object({
  id: z.string(),
  boardId: z.string(),
  todoId: z.string(),
});

import { z } from "zod";

export const UpdateToDo = z.object({
  id: z.string(),
  boardId: z.string(),
  todoId: z.string(),
  progress: z.number(),
  toDoItems: z.record(z.object({
    todo: z.string(),
    dateCreated: z.string(),
    completed: z.boolean(),
    dateCompleted: z.string().nullable(),
  })),
});

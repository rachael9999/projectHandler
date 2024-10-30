// schema.ts
import { z } from "zod";

export const UpdateCard = z.object({
  id: z.string(),
  boardId: z.string(),
  importance: z.enum(["LOW", "MEDIUM", "HIGH", "UNDEFINED"]), // Use enum values from Prisma
});
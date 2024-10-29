// types.ts
import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { CreateToDo } from "./schema";

export type CreateToDoInputType = z.infer<typeof CreateToDo>;
export type CreateToDoReturnType = ActionState<CreateToDoInputType, Card>;
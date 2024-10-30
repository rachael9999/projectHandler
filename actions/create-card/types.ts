// types.ts
import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { CreateCard } from "./schema";

export type CreateCardInputType = z.infer<typeof CreateCard>;
export type CreateCardReturnType = ActionState<CreateCardInputType, Card>;
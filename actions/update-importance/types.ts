// types.ts
import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { UpdateCard } from "./schema";

export type UpdateCardInputType = z.infer<typeof UpdateCard>;
export type UpdateCardReturnType = ActionState<UpdateCardInputType, Card>;
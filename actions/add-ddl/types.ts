import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-actions";
import { AddDDL } from "./schema";

export type AddDDLInputType = z.infer<typeof AddDDL>;
export type AddDDLReturnType = ActionState<AddDDLInputType, Card>;

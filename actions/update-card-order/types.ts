import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, List>;

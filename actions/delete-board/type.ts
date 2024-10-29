import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { deleteBoard } from "./schema";

export type InputType = z.infer<typeof deleteBoard>;
export type ReturnType = ActionState<InputType, Board>;

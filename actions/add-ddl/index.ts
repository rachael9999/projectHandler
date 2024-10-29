"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { AddDDL } from "./schema";
import { AddDDLInputType, AddDDLReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const addDDLHandler = async (data: AddDDLInputType): Promise<AddDDLReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { cardId, ddl } = data;

  try {
    const card = await db.card.update({
      where: { id: cardId },
      data: { deadline: new Date(ddl) },
    });

    if (!card) {
      return {
        error: "Card not found",
      };
    }

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
      message: `set due date to ${new Date(ddl).toLocaleString()}`
    });

    revalidatePath(`/board/${card.id}`);
    return { data: card };
  } catch (error) {
    return {
      error: "Failed to update card with ddl.",
    };
  }
};

export const addDDL = createSafeAction(AddDDL, addDDLHandler);
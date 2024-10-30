// update-importance.ts
"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { UpdateCard } from "./schema";
import { UpdateCardInputType, UpdateCardReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: UpdateCardInputType): Promise<UpdateCardReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id, boardId, importance } = data;

  let card;
  try {
    card = await db.card.findUnique({
      where: {
        id,
        List: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!card) {
      return { error: "Card not found" };
    }

    // Update the card with the new importance
    await db.card.update({
      where: { id: card.id },
      data: {
        importance,
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
      message: `Updated card importance to "${importance}"`,
    });

  } catch (error) {
    return {
      error: "Failed to update card importance.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateImportance = createSafeAction(UpdateCard, handler);
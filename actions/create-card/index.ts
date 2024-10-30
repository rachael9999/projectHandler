// create-card.ts
"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { CreateCard } from "./schema";
import { CreateCardInputType, CreateCardReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: CreateCardInputType): Promise<CreateCardReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId, listId, importance } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return { error: "List not found" };
    }

    card = await db.card.create({
      data: {
        title,
        listId,
        order: 0, // Adjust order as needed
        importance: importance !== "UNDEFINED" ? importance : "LOW", // Handle UNDEFINED importance
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
      message: `Created card "${title}" with importance "${importance}"`,
    });

    revalidatePath(`/board/${boardId}`);
    return { data: card };
  } catch (error) {
    return {
      error: "Failed to create card.",
    };
  }
};

export const createCard = createSafeAction(CreateCard, handler);
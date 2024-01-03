"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { UpdateToDo } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id, boardId, todoId } = data;

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

    let toDoItems = {};
    if (!card) {
      return { error: "Card not found" };
    }
    if (typeof card.toDo === "string" && card.toDo) {
      try {
        toDoItems = JSON.parse(card.toDo);
      } catch (e) {
        // Handle JSON parsing error
        return { error: "Failed to parse to-do items." };
      }
    }
    // Update the specific to-do item
    toDoItems[todoId] = {
      ...toDoItems[todoId],
      completed: !toDoItems[todoId].completed,
      dateCompleted: true ? new Date() : null,
    };

    // Update the card with the modified to-do items
    await db.card.update({
      where: { id: card.id },
      data: {
        toDo: JSON.stringify(toDoItems),
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to update to-do item.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateTodo = createSafeAction(UpdateToDo, handler);

"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { UpdateToDo } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface ToDoItem {
  todo: string;
  dateCreated: string;
  completed: boolean;
  dateCompleted: string | null;
}

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id, boardId, todoId, progress, toDoItems } = data;

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

    // Update the card with the modified to-do items and progress
    await db.card.update({
      where: { id: card.id },
      data: {
        toDo: JSON.stringify(toDoItems),
        progress,
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
      message: `Updated to-do item "${toDoItems[todoId].todo}" as ${toDoItems[todoId].completed ? 'finished' : 'not finished'}`,
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
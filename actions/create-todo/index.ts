// create-todo.ts
"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { CreateToDo } from "./schema";
import { CreateToDoInputType, CreateToDoReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface ToDoItem {
  todo: string;
  dateCreated: string;
  completed: boolean;
  dateCompleted: string | null;
}

const handler = async (data: CreateToDoInputType): Promise<CreateToDoReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id, boardId, toDo } = data;

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

    let toDoItems: Record<string, ToDoItem> = {};
    if (typeof card.toDo === "string" && card.toDo) {
      toDoItems = JSON.parse(card.toDo);
    }

    const newToDoId = crypto.randomUUID();
    const newToDo: ToDoItem = {
      todo: toDo,
      dateCreated: new Date().toISOString(),
      completed: false,
      dateCompleted: null,
    };

    toDoItems[newToDoId] = newToDo;

    // Calculate progress
    const totalItems = Object.keys(toDoItems).length;
    const completedItems = Object.values(toDoItems).filter(item => item.completed).length;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

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
      message: `Added new to-do item "${toDo}"`,
    });

  } catch (error) {
    return {
      error: "Failed to add to-do item.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createToDo = createSafeAction(CreateToDo, handler);
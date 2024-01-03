"use server";

import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { CreateToDo } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
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
    // Create a new to-do item with a unique ID
    const newToDoId = uuidv4();
    toDoItems[newToDoId] = {
      todo: data.toDo,
      dateCreated: new Date(),
      completed: false,
    };

    // Update the card with the new to-do items
    const updatedCard = await db.card.update({
      where: { id: card.id },
      data: {
        toDo: JSON.stringify(toDoItems), // Convert back to JSON string
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
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

"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let card;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          List: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    card = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to order.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);

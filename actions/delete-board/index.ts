"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { deleteBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreaseAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await decreaseAvailableCount();
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
      message: ``,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const DeleteBoard = createSafeAction(deleteBoard, handler);

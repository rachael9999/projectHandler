"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, ImageThumbUrl, ImageFullUrl, ImageLinkHTML, ImageUserName] =
    image.split("|");

  if (
    !imageId ||
    !ImageThumbUrl ||
    !ImageFullUrl ||
    !ImageLinkHTML ||
    !ImageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board",
    };
  }
  console.log({
    imageId,
    ImageThumbUrl,
    ImageFullUrl,
    ImageLinkHTML,
    ImageUserName,
  });

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        ImageThumbUrl,
        ImageFullUrl,
        ImageUserName,
        ImageLinkHTML,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

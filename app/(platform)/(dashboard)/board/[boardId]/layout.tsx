import { auth } from "@clerk/nextjs";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import {BoardNavbar} from "../../_components/board-navbar";

interface BoardIdLayoutProps {
  params: {
    boardId: string;
  };
  children: React.ReactNode;
}

const BoardIdLayout = async ({ params, children }: BoardIdLayoutProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.ImageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-40 h-full mt-3">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
// app/(platform)/(dashboard)/board/[boardId]/importance/page.tsx
import { db } from '@/lib/db';
import { BoardNavbar } from '../../../_components/board-navbar';
import CardImportance from './card-importance'; // Adjust the import path as needed

interface ImportancePageProps {
  params: {
    boardId: string;
  };
}

const ImportancePageComponent = async ({ params }: ImportancePageProps) => {
  const { boardId } = params;

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    return <div>Board not found</div>;
  }

  const cards = await db.card.findMany({
    where: { List: { boardId } },
  });

  return (
    <div>
      <BoardNavbar data={board} />
      <CardImportance cards={cards} boardId = {boardId} />
    </div>
  );
};

export default ImportancePageComponent;
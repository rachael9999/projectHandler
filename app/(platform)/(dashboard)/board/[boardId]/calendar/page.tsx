// app/(platform)/(dashboard)/board/[boardId]/calendar/page.tsx
import { db } from '@/lib/db';
import { BoardNavbar } from '../../../_components/board-navbar';
import CalendarComponent from './calendar-component';

interface CalendarPageProps {
  params: {
    boardId: string;
  };
}

const CalendarPage = async ({ params }: CalendarPageProps) => {
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

  const events = cards.map(card => ({
    id: card.id,
    title: card.title,
    start: card.createdAt.toISOString(),
    end: card.deadline ? card.deadline.toISOString() : card.createdAt.toISOString(),
  }));

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.ImageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-white/50" /> {/* Adjust opacity as needed */}
      <main className="relative h-full">
        <div className="h-full">
          <CalendarComponent events={events} />
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
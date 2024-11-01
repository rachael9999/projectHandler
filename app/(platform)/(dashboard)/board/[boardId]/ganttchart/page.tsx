// app/(platform)/(dashboard)/board/[boardId]/ganttchart/page.tsx
import { db } from '@/lib/db';
import { BoardNavbar } from '../../../_components/board-navbar';
import GanttChart from './gantt-chart';

interface GanttChartPageProps {
  params: {
    boardId: string;
  };
}

const GanttChartPage = async ({ params }: GanttChartPageProps) => {
  const { boardId } = params;

  try {
    const board = await db.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      return <div>Board not found</div>;
    }

    const cards = await db.card.findMany({
        where: { List: { boardId } },
        orderBy: { order: 'asc' },
    });

    const events = cards.map(card => ({
      id: card.id,
      title: card.title,
      start: card.createdAt.toISOString(),
      end: card.deadline ? card.deadline.toISOString() : new Date(card.createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      order: card.order,
    }));


    return (
      <div
        className="relative h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${board.ImageFullUrl})` }}
      >
        <BoardNavbar data={board} />
        <div className="absolute inset-0 bg-white/50" />
        <main className="relative h-full">
          <div className="h-full">
            <GanttChart events={events} />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Internal Server Error</div>;
  }
};

export default GanttChartPage;
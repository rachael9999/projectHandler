import { DeleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

interface boardProps {
  title: String;
  id: string;
}

export const Board = ({ title, id }: boardProps) => {
  const deleteBoardId = DeleteBoard.bind(null, { id });
  return (
    <form action={deleteBoardId} className="flex items-center gap-x-2">
      <p>Board title: {title}</p>
      <Button type="submit" variant="destructive" size="sm">
        Delete
      </Button>
    </form>
  );
};

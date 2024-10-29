"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modals";

interface CardItemProps {
  data: Card;
  index: number;
}

function calculateBackgroundGradient(progress: number): string {
  return `linear-gradient(to right, lightblue ${progress}%, lightgrey ${progress}%)`;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate border-2 border-white-500 hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          style={{
            background: calculateBackgroundGradient(data.progress),
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
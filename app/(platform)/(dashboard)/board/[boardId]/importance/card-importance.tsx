// app/(platform)/(dashboard)/board/[boardId]/importance/card-importance.tsx
'use client';

import { Card } from '@prisma/client';
import { CardItem } from '../../../_components/card-item'; // Adjust the import path as needed
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { updateImportance } from '../../../../../../actions/update-importance'; // Adjust the import path as needed
import { toast } from 'sonner';

interface CardImportanceProps {
  cards: Card[];
  boardId: string;
}

const CardImportance = ({ cards, boardId }: CardImportanceProps) => {
  const [cardList, setCardList] = useState(cards);

  const filterCardsByImportance = (importance: string) => {
    return cardList.filter(card => card.importance === importance);
  };

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceImportance = source.droppableId;
    const destinationImportance = destination.droppableId;

    if (sourceImportance === destinationImportance) return;

    const updatedCards = cardList.map(card => {
      if (card.id === result.draggableId) {
        return { ...card, importance: destinationImportance };
      }
      return card;
    });

    setCardList(updatedCards);

    // Update the backend with the new importance
    try {
        await updateImportance({
            id: result.draggableId,
            boardId: boardId,
            importance: destinationImportance,
          });
        toast.success(`Card importance updated`);
    } catch (error) {
        toast.error(`Failed to update card importance`);
    }

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap">
        {['UNDEFINED', 'LOW', 'MEDIUM', 'HIGH'].map(importance => (
          <Droppable droppableId={importance} key={importance}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/4 p-2"
              >
                <h2 className="text-lg font-bold">{importance}</h2>
                {filterCardsByImportance(importance).map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardItem data={card} index={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default CardImportance;
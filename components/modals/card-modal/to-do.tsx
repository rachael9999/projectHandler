"use client";

import { useState, useEffect } from "react";
import { ClipboardCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { toast } from "sonner";
import { updateTodo } from "@/actions/update-todo";
import { useAction } from "@/hooks/useAction";
import { useParams } from "next/navigation";

interface ToDoItem {
  todo: string;
  dateCreated: string;
  completed: boolean;
  dateCompleted: string | null;
}

interface TodoProps {
  data: CardWithList;
}

export const ToDo = ({ data }: TodoProps) => {
  const [toDoItems, setToDoItems] = useState<Record<string, ToDoItem>>({});
  const params = useParams();
  const boardId = params.boardId as string;

  useEffect(() => {
    if (data && typeof data.toDo === "string") {
      const parsedToDoItems = JSON.parse(data.toDo) as Record<string, ToDoItem>;
      setToDoItems(parsedToDoItems);
    }
  }, [data]);

  const { execute } = useAction(updateTodo, {
    onSuccess: (data) => {
      toast.success(`To-Do updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const calculateProgress = (items: Record<string, ToDoItem>) => {
    const totalItems = Object.keys(items).length;
    const completedItems = Object.values(items).filter(
      (item) => item.completed
    ).length;
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  const handleCheckboxChange = (todoId: string) => {
    const updatedItems = { ...toDoItems };
    const currentToDo = updatedItems[todoId];
    if (currentToDo) {
      const updatedToDo = {
        ...currentToDo,
        completed: !currentToDo.completed,
        dateCompleted: currentToDo.completed ? null : new Date().toISOString(),
      };

      updatedItems[todoId] = updatedToDo;
      setToDoItems(updatedItems);

      // Calculate the progress
      const progress = calculateProgress(updatedItems);

      // Update the to-do item and progress in the database
      execute({
        id: data.id,
        boardId,
        todoId: todoId,
        progress: progress,
        toDoItems: updatedItems,
      });
    }
  };

  const progress = calculateProgress(toDoItems);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="flex items-start gap-x-3">
        <ClipboardCheck className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">To Do</p>
          <div className="flex items-center w-full">
            <div className="flex-grow bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              {progress.toFixed(0)}%
            </span>
          </div>
          <ol className="mt-2 space-y-4 text-lg">
            {Object.entries(toDoItems).map(([id, item]) => (
              <li key={id} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 ml-2"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(id)}
                />
                <span className={item.completed ? "line-through" : ""}>
                  {item.todo}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

ToDo.Skeleton = function ToDoSkeleton() {
  return <div></div>;
};
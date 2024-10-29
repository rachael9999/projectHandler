"use client";

import { toast } from "sonner";
import { Copy, Trash, ClipboardCheck, Calendar, Workflow } from "lucide-react";
import { useParams } from "next/navigation";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/useAction";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modals";
import { ElementRef, useRef, useState, useEffect } from "react";
import { createToDo } from "@/actions/create-todo";
import { addDDL } from "@/actions/add-ddl";
import React from "react";
import { FormInput } from "@/components/form/form-input";
import CustomDatePicker from "./date";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const [toDoOptions, setToDoOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(data.deadline ? new Date(data.deadline) : null);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeAddDDL, isLoading: isLoadingDDL } = useAction(
    addDDL,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" ddl added`);
        setDueDate(data.deadline ? new Date(data.deadline) : null);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeAddToDo, isLoading: isLoadingToDo } = useAction(
    createToDo,
    {
      onSuccess: (data) => {
        toast.success(`To do in "${data.title}" added`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    }).finally(() => {
      cardModal.onClose();
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date && date.getTime() === dueDate?.getTime()) {
      // If the selected date is the same as the current due date, do nothing
      return;
    }
    setSelectedDate(date);
    if (date) {
      executeAddDDL({ cardId: data.id, ddl: date.toISOString() });
    }
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    }).finally(() => {
      cardModal.onClose();
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const todo = formData.get("todo") as string;
    const boardId = params.boardId as string;

    console.log(todo);
    if (todo.length === 0) return;

    executeAddToDo({
      id: data.id,
      boardId,
      toDo: todo,
    });

    setToDoOptions(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    if (toDoOptions) {
      inputRef.current?.focus();
    }
  }, [toDoOptions]);

  return (
    <div className="space-y-1 mt-1">
      <div className="flex items-center justify-start text-sm font-semibold mb-1">
        <Calendar className="h-4 w-4 mr-2 inline" />
        Due Date:
      </div>
      {dueDate ? (
        <span
          onClick={() => setShowDatePicker(true)}
          className="cursor-pointer text-2xl font-bold"
        >
          {dueDate.toLocaleDateString()}
        </span>
      ) : (
        <Button
          onClick={() => setShowDatePicker(true)}
          disabled={isLoadingDDL}
          variant="gray"
          className="w-full justify-start"
          size="inline"
        >
          Add Due Date
        </Button>
      )}
      {showDatePicker && (
        <form onSubmit={onSubmit}>
          <CustomDatePicker selectedDate={selectedDate} onChange={handleDateChange} />
        </form>
      )}
      <hr className="my-8 bolder-t-2 border-neutral-700" />
      <div className="flex items-center space-x-2">
        <Workflow className="h-5 w-5 mt-0.5 text-neutral-700" />
        <p className="text-sm font-semibold">Actions</p>
      </div>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
      {toDoOptions ? (
        <form ref={formRef} onSubmit={onSubmit}>
          <FormInput
            id="todo"
            ref={inputRef}
            onBlur={onBlur}
            className="text-sm px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none border-none"
          />
        </form>
      ) : (
        <Button
          onClick={() => setToDoOptions(true)}
          disabled={isLoadingToDo}
          variant="gray"
          className="w-full justify-start"
          size="inline"
        >
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Add To Do
        </Button>
      )}
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
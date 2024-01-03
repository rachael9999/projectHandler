"use client";

import { toast } from "sonner";
import { Copy, Trash, ClipboardCheck } from "lucide-react";
import { useParams } from "next/navigation";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/useAction";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modals";
import { ElementRef, useRef, useState } from "react";
import { createToDo } from "@/actions/create-todo";
import React from "react";
import { FormInput } from "@/components/form/form-input";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const [toDoOptions, setToDoOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    }).finally(() => {
      cardModal.onClose();
    });
  };

  const onSubmit = (formData: FormData) => {
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

  if (isEdit) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="todo"
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={""}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none border-none"
        />
      </form>
    );
  }
  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
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

      {!toDoOptions && (
        <Button
          onClick={() => {
            setToDoOptions(!toDoOptions);
          }}
          disabled={isLoadingToDo}
          variant="gray"
          className="w-full justify-start"
          size="inline"
        >
          <ClipboardCheck className="h-4 w-4 mr-2" />
          To Do
        </Button>
      )}

      {toDoOptions && (
        <form action={onSubmit} ref={formRef}>
          <FormInput
            id="todo"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={""}
            className="text-sm w-full bg-transparent focus-visible:outline-none "
          />
        </form>
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
    </div>
  );
};

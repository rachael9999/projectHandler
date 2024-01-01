"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/useAction";
import { List } from "@prisma/client";
import { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOption } from "./list-option";
interface listHeaderProps {
  data: List;
  onAddCard: () => void;
}
export const ListHeader = ({ data, onAddCard }: listHeaderProps) => {
  const [title, setTitle] = useState(data.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }

    if (e.key === "Enter") {
      formRef.current?.requestSubmit();
    }
  };

  const { execute, FieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEventListener("keydown", onKeyDown);
  return (
    <div className="pt-2 px-2 text-sm font-bold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            error={FieldErrors}
            className="text-sm px-2 py-1 h-7 font-semibold border-transparent 
                    hover:border-input focus:border-input transition truncate"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm font-semibold px-2.5 py-1 h-7 border-transparent"
        >
          {title}
        </div>
      )}
      <ListOption onAddCard={onAddCard} data={data} />
    </div>
  );
};

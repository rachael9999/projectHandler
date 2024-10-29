"use client";

import { Plus } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { FormInput } from "@/components/form/form-input";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/useAction";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createList } from "@/actions/create-list";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, FieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
    if (e.key === "Enter") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            error={FieldErrors}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent 
              hover:border-input focus:border-input transition"
          />

          <input hidden value={params.boardId} name="boardId" />
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition 
            p-3 flex items-center font-medium text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a list
        </button>
      </form>
    </ListWrapper>
  );
};

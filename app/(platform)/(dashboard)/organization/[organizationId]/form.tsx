"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/useAction";
import { useFormStatus } from "react-dom";

export const Form = () => {
  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      image: "",
    });
  };

  const { pending } = useFormStatus();

  return (
    <div className="flex items-center space-x-2">
      <form action={onSubmit}>
        <FormInput label="board title" error={FieldErrors} id={"title"} />
      </form>
    </div>
  );
};

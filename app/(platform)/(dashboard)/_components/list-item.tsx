"use client";

import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { ListHeader } from "./list-header";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(textareaRef, disableEditing);

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-slate-300 shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

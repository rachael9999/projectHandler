"use client";

import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { ListHeader } from "./list-header";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

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
    <ol className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-slate-300 shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />
        <ol className="mx-1 px-1 py-0.5 flex flex-col gap-y-2 mt-1">
          {data.cards.map((card, index) => (
            <CardItem index={index} key={card.id} data={card} />
          ))}
        </ol>
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </ol>
  );
};

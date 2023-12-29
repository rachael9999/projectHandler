"use client";

import { Card } from "@prisma/client";

interface cardItemProps {
  data: Card;
  index: number;
}
export const CardItem = ({ data, index }: cardItemProps) => {
  return (
    <div>
      <div
        role="button"
        className="truncate border-2 border-transparent py-2 px-3 text-sm rounded-md hover:border-black bg-white shadow-sm"
      >
        {data.title}
      </div>
    </div>
  );
};

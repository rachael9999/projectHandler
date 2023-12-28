"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(data);

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function calculateItemsPerRow(windowWidth: number) {
    const itemWidth = 300;
    const itemsPerRow = Math.floor(windowWidth / itemWidth);
    return Math.max(itemsPerRow, 1); // Ensure at least one item per row
  }

  const itemsPerRow = calculateItemsPerRow(windowWidth);

  // Dynamic grid style for the container
  const gridContainerStyle = {
    gridTemplateColumns: `repeat(${itemsPerRow}, minmax(min-content, max-content))`,
  };

  return (
    <div
      className="justify-center display: grid gap-4 ml-4"
      style={gridContainerStyle}
    >
      <div className="gap-2">
        <ListForm />
      </div>
      {orderData.map((list, index) => (
        <div key={list.id} className="gap-2">
          <ListItem index={index} data={list} />
        </div>
      ))}
    </div>
  );
};

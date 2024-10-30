import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import Link from "next/link";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-25 z-[40] bg-black/50 fixed top-14 flex flex-col items-center gap-x-4 text-white">
      <div className="bg-blue-200 bg-opacity-50 px-6 flex w-full items-center p-1">
        <BoardTitleForm data={data} />
        <div className="ml-auto">
          <BoardOptions id={data.id} />
        </div>
      </div>
      <nav className="bg-transparant-300 w-full p-3 ">
        <ul className="flex justify-center w-full">
          <li className="flex-1 text-center">
            <Link href={`/board/${data.id}`} className="text-white-700 hover:text-white-900 hover:bg-gray-700 hover:underline hover:font-bold p-2 rounded">
              General
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link href={`/board/${data.id}/calendar`} className="text-white-700 hover:text-white-900 hover:bg-gray-700 hover:underline hover:font-bold p-2 rounded">
              Calendar
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link href={`/board/${data.id}/ganttchart`} className="text-white-700 hover:text-white-900 hover:bg-gray-700 hover:underline hover:font-bold p-2 rounded">
              Gantt Chart
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link href={`/board/${data.id}/importance`} className="text-white-700 hover:text-white-900 hover:bg-gray-700 hover:underline hover:font-bold p-2 rounded">
              Importance
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
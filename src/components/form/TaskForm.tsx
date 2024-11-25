"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

interface IProps {
  edit?: boolean;
}

export const TaskForm = ({ edit }: IProps) => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center gap-x-2 p-2">
        <Link href="/">
          <HiChevronLeft className="" size={24} />
        </Link>

        <span>{edit ? "Edit task" : "Create task"}</span>
      </div>

      <div className="basis-full"></div>
    </div>
  );
};

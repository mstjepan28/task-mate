"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

interface IProps {
  edit?: boolean;
}

export const TaskForm = ({ edit }: IProps) => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center gap-x-2 border-b border-gray-900 px-2 py-3">
        <Link href="/">
          <HiChevronLeft className="" size={24} />
        </Link>

        <span className="text-lg font-semibold">{edit ? "Edit task" : "Create task"}</span>
      </div>

      <div className="basis-full"></div>
    </div>
  );
};

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export const ScreenHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-x-2 border-b border-gray-900 px-2 py-3">
      <Link href="/">
        <HiChevronLeft className="" size={24} />
      </Link>

      <span className="text-lg font-semibold">{title}</span>
    </div>
  );
};

import Link from "next/link";
import { HiMenu, HiOutlineClipboardList } from "react-icons/hi";

export const BottomNav = () => {
  return (
    <div className="grid grid-cols-5 gap-x-2 border-t border-t-gray-900 p-2">
      <BottomNavItem to="/">
        <HiOutlineClipboardList size={24} />
      </BottomNavItem>

      <BottomNavItem>btn</BottomNavItem>

      <BottomNavItem>btn</BottomNavItem>

      <BottomNavItem>btn</BottomNavItem>

      <BottomNavItem to="/profile">
        <HiMenu size={24} />
      </BottomNavItem>
    </div>
  );
};

interface IBottomNavItemProps {
  to?: string;
  children: React.ReactNode;
}
const BottomNavItem = ({ to, children }: IBottomNavItemProps) => {
  return (
    <Link href={to ?? "/"} className="flex items-center justify-center py-2">
      {children}
    </Link>
  );
};

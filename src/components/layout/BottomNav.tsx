import { HiMenu, HiOutlineClipboardList } from "react-icons/hi";

export const BottomNav = () => {
  return (
    <div className="grid grid-cols-5 gap-x-2 border-t border-t-gray-900 p-2">
      <BottomNavItem>
        <HiOutlineClipboardList size={24} />
      </BottomNavItem>
      <BottomNavItem>btn</BottomNavItem>
      <BottomNavItem>btn</BottomNavItem>
      <BottomNavItem>btn</BottomNavItem>
      <BottomNavItem>
        <HiMenu size={24} />
      </BottomNavItem>
    </div>
  );
};

interface IBottomNavItemProps {
  children: React.ReactNode;
}
const BottomNavItem = ({ children }: IBottomNavItemProps) => {
  return <div className="flex items-center justify-center py-2">{children}</div>;
};

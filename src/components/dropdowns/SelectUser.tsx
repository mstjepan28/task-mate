import type { TBasicDataUser } from "~/types/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const SelectUser = ({ name, userList }: { name: string; userList: TBasicDataUser[] }) => {
  return (
    <Select name={name}>
      <SelectTrigger>
        <SelectValue placeholder="Assign to" />
      </SelectTrigger>

      <SelectContent>
        {userList.map((user) => {
          return (
            <SelectItem key={user.id} value={user.id}>
              <span>{user.name}</span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

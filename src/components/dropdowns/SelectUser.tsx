import type { TBasicDataUser } from "~/types/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const SelectUser = ({
  name,
  defaultValue,
  userList,
}: {
  name: string;
  defaultValue?: string;
  userList: TBasicDataUser[];
}) => {
  return (
    <Select name={name} defaultValue={defaultValue}>
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

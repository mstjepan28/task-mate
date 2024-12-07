import { RepeatCycle } from "~/enums/repeatCycle";
import { objectValues } from "~/lib/objectHelpers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const RepeatCycleSelect = ({ name }: { name: string }) => {
  return (
    <Select name={name}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        {objectValues(RepeatCycle).map((cycle) => {
          return (
            <SelectItem key={cycle} value={cycle}>
              <span className="capitalize">{cycle.toLowerCase()}</span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

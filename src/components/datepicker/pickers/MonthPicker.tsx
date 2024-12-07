import dayjs, { type Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { PickerHeader } from "../PickerHeader";

interface IProps {
  initDate?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  onChange: (date: Dayjs) => void;
}

const FALLBACK_SELECT = null;
const FALLBACK_MONTH = dayjs();

export const MonthPicker = ({ initDate, minDate, maxDate, onChange }: IProps) => {
  const [selectedMonth, setSelectedMonth] = useState(initDate ?? FALLBACK_SELECT);
  const [displayYear, setDisplayYear] = useState(initDate ?? FALLBACK_MONTH);

  // ----------------------------------------- //

  const selectMonth = (month: number) => {
    const newSelectedMonth = dayjs(`${displayYear.format("YYYY")}-${month}-01`);

    setSelectedMonth(newSelectedMonth);
    onChange(newSelectedMonth);
  };

  const changeYear = (changeBy: number) => {
    const newDisplayYear = displayYear.add(changeBy, "year");
    setDisplayYear(newDisplayYear);
  };

  const isYearInRange = useMemo(() => {
    return {
      next: maxDate ? displayYear.startOf("year").add(1, "year").isBefore(maxDate, "month") : true,
      prev: minDate ? displayYear.endOf("year").subtract(1, "year").isAfter(minDate, "month") : true,
    };
  }, [displayYear, minDate, maxDate]);

  const isMonthInValidRange = (month: Dayjs) => {
    if (minDate && month.isBefore(minDate, "month")) {
      return false;
    }

    if (maxDate && month.isAfter(maxDate, "month")) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <PickerHeader
        label={displayYear.format("YYYY")}
        onPrev={() => changeYear(-1)}
        onNext={() => changeYear(1)}
        controlsDisabled={{
          next: !isYearInRange.next,
          prev: !isYearInRange.prev,
        }}
      />

      <div className="grid grid-cols-3">
        {Array.from({ length: 12 }).map((_, index) => {
          const month = dayjs().set("year", displayYear.year()).month(index);

          const isSelected = selectedMonth?.isSame(month, "month") && selectedMonth?.isSame(displayYear, "year");
          const isDisabled = !isMonthInValidRange(month);

          const isCurrentMonth = dayjs().isSame(month, "month");

          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => selectMonth(index + 1)}
              className="px-1 py-0.5 disabled:opacity-50"
            >
              <div
                data-selected={isSelected}
                data-current={isCurrentMonth && !isSelected}
                className={`size-full rounded-lg border border-transparent px-0.5 py-1 text-sm font-bold data-[current=true]:border-gray-900 data-[selected=true]:bg-gray-900 data-[selected=true]:text-white`}
              >
                {month.format("MMMM")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

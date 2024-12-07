import dayjs, { type Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useMemo, useState } from "react";
import { DayIndex } from "~/enums/dayIndex";
import { getDatesToDisplay, getWeekDays, isDateOutOfRange } from "../datePickerHelpers";
import { PickerHeader } from "../PickerHeader";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface IProps {
  initDate?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  selectRange?: "1" | "3" | "7";
  onChange: (date: Dayjs) => void;
}

const FALLBACK_SELECT = null;
const FALLBACK_MONTH = dayjs();

export const DayPicker = ({ initDate, minDate, maxDate, onChange, selectRange }: IProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(FALLBACK_SELECT);
  const [displayMonth, setDisplayMonth] = useState<Dayjs>(FALLBACK_MONTH);

  useEffect(() => {
    setSelectedDate(initDate ?? FALLBACK_SELECT);
    setDisplayMonth(initDate ?? FALLBACK_MONTH);
  }, [JSON.stringify(initDate)]);

  const setFilter = (filterDate: Dayjs) => {
    setSelectedDate(filterDate);
    onChange(filterDate);
  };

  const changeMonth = (changeBy: number) => {
    const newDate = displayMonth.add(changeBy, "month");
    setDisplayMonth(newDate);
  };

  const isMonthInRange = useMemo(() => {
    return {
      next: maxDate ? displayMonth.startOf("month").add(1, "month").isBefore(maxDate, "day") : true,
      prev: minDate ? displayMonth.endOf("month").subtract(1, "month").isAfter(minDate, "day") : true,
    };
  }, [displayMonth, minDate, maxDate]);

  const datesToDisplay = useMemo(() => {
    return getDatesToDisplay(displayMonth);
  }, [displayMonth]);

  const daysToDisplay = useMemo(() => {
    return getWeekDays();
  }, []);

  const showAsSelected = (date: Dayjs) => {
    if (!selectedDate) {
      return false;
    }

    if (selectRange === "3") {
      return date.isSameOrAfter(selectedDate, "day") && date.isSameOrBefore(selectedDate.add(2, "day"), "day");
    }

    if (selectRange === "7") {
      const monday = selectedDate.day(DayIndex.MONDAY);
      return date.isSameOrAfter(monday, "day") && date.isSameOrBefore(monday.add(6, "day"), "day");
    }

    return selectedDate.isSame(date, "day");
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {/* Header */}
      <PickerHeader
        label={displayMonth.format("MMM YYYY")}
        onPrev={() => changeMonth(-1)}
        onNext={() => changeMonth(1)}
        controlsDisabled={{
          next: !isMonthInRange.next,
          prev: !isMonthInRange.prev,
        }}
      />

      <div className="grid grid-cols-7 py-2">
        {daysToDisplay.map((day) => {
          return (
            <div key={day} className="text-center text-sm font-semibold text-gray-500">
              {day}
            </div>
          );
        })}
      </div>

      {datesToDisplay.map((week, weekIndex) => {
        return (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day, index) => {
              const dateColor = displayMonth.isSame(day, "month") ? "text-gray-900" : "text-gray-500";

              const isToday = day.isSame(dayjs(), "day");
              const isSelected = showAsSelected(day);

              return (
                <button
                  key={index}
                  type="button"
                  data-testid={day.format("YYYY-MM-DD")}
                  onClick={() => setFilter(day)}
                  className={`flex w-full justify-center px-0.5 py-1 disabled:opacity-50 ${dateColor}`}
                  disabled={isDateOutOfRange(day, { minDate, maxDate })}
                >
                  <div
                    data-current={isToday && !isSelected}
                    data-selected={isSelected}
                    className={`size-full rounded-lg border border-transparent px-0.5 py-1 text-sm font-bold data-[current=true]:border-gray-900 data-[selected=true]:bg-gray-900 data-[selected=true]:text-white`}
                  >
                    {day.format("DD")}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

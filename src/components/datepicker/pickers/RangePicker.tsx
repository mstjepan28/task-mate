import dayjs, { type Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useMemo, useState } from "react";
import { sortDateArray } from "~/lib/utils";
import { getDatesToDisplay, getWeekDays, isDateOutOfRange } from "../datePickerHelpers";
import { PickerHeader } from "../PickerHeader";
import type { TRange, TRangeSelection } from "../range";
import { RangeStatus, type TRangeStatus } from "../RangeStatus";

interface IProps {
  initRange?: TRange;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  onChange: (range: TRange) => void;
}

const FALLBACK_SELECT: TRangeSelection = [];
const FALLBACK_MONTH = dayjs();

dayjs.extend(isBetween);

export const RangePicker = ({ initRange, minDate, maxDate, onChange }: IProps) => {
  const [selectedRange, setSelectedRange] = useState<TRangeSelection>(FALLBACK_SELECT);
  const [tempRange, setTempRange] = useState<TRangeSelection | null>(null);

  const [displayMonth, setDisplayMonth] = useState(initRange?.to ?? FALLBACK_MONTH);

  useEffect(() => {
    setSelectedRange(initRange ? Object.values(initRange) : FALLBACK_SELECT);
    setDisplayMonth(initRange?.to ?? FALLBACK_MONTH);
  }, [initRange]);

  const getNewRange = (selectedDay: Dayjs) => {
    if (!tempRange) {
      return [selectedDay, selectedDay];
    } else {
      return sortDateArray([tempRange[0] ?? dayjs(), selectedDay]);
    }
  };

  const onDayClick = (day: Dayjs) => {
    const [start, end] = getNewRange(day);
    if (!start || !end) {
      throw new Error("Invalid range");
    }

    setSelectedRange([start, end]);

    onChange({
      from: start.startOf("day"),
      to: end.endOf("day"),
    });

    if (tempRange) {
      setTempRange(null);
    } else {
      setTempRange([start, end]);
    }
  };

  const onDayHover = (day: Dayjs) => {
    if (!tempRange) {
      return;
    }

    const newTempRange = tempRange.length === 0 ? [day] : [tempRange[0] ?? dayjs(), day];
    setTempRange(newTempRange);
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

  const checkDayAgainstRange = (day: Dayjs, range: TRangeSelection | null) => {
    if (!range || range.length !== 2) {
      return;
    }

    if (day.isSame(range[0], "day") || day.isSame(range[1], "day")) {
      return RangeStatus.SELECTED;
    }
    if (day.isBetween(range[0], range[1])) {
      return RangeStatus.BETWEEN;
    }
  };

  const getDayStatus = (day: Dayjs): TRangeStatus => {
    const tempStatus = checkDayAgainstRange(day, tempRange);
    if (tempStatus) {
      return tempStatus;
    }

    const selectedStatus = checkDayAgainstRange(day, selectedRange);
    if (selectedStatus) {
      return selectedStatus;
    }

    if (day.isSame(dayjs(), "day")) {
      return RangeStatus.TODAY;
    }

    return RangeStatus.OUTSIDE;
  };

  const datesToDisplay = useMemo(() => {
    return getDatesToDisplay(displayMonth);
  }, [displayMonth]);

  const daysToDisplay = useMemo(() => {
    return getWeekDays();
  }, []);

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
              const status = getDayStatus(day);

              return (
                <button
                  key={index}
                  type="button"
                  data-status={status}
                  data-testid={day.format("YYYY-MM-DD")}
                  onClick={() => onDayClick(day)}
                  onMouseEnter={() => onDayHover(day)}
                  className={`group flex w-full justify-center rounded-lg px-0.5 py-1 disabled:opacity-50 ${dateColor} relative data-[status=between]:px-0 data-[status=selected]:px-0`}
                  disabled={isDateOutOfRange(day, { minDate, maxDate })}
                >
                  <div
                    className={`group-data-[status=between]:bg-primary-100/50 h-fit w-full self-center rounded-lg border border-transparent px-0.5 py-1 text-sm font-bold group-data-[status=between]:rounded-none group-data-[status=today]:border-gray-900 group-data-[status=selected]:bg-gray-900 group-data-[status=selected]:text-white`}
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

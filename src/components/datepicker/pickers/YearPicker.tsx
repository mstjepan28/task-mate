import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { PickerHeader } from "../PickerHeader";
import { getDecadeForDate } from "../datePickerHelpers";

interface IProps {
  initDate?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  onChange: (date: Dayjs) => void;
}

type TDecade = {
  start: Dayjs;
  end: Dayjs;
};

const FALLBACK_DECADE = getDecadeForDate();

export const YearPicker = ({ initDate, minDate, maxDate, onChange }: IProps) => {
  const [selectedYear, setSelectedYear] = useState(initDate ?? null);
  const [displayDecade, setDisplayDecade] = useState<TDecade>(FALLBACK_DECADE);

  useEffect(() => {
    const decade = getDecadeForDate(initDate);
    setDisplayDecade(decade);
  }, [initDate]);

  const selectYear = (year: number) => {
    const newSelectedYear = dayjs(`${year}-01-01`);

    setSelectedYear(newSelectedYear);
    onChange(newSelectedYear);
  };

  const changeDecade = (changeBy: number) => {
    if (changeBy < 0 && displayDecade.start.year() <= dayjs().year() - 100) {
      return;
    }
    if (changeBy > 0 && displayDecade.end.year() >= dayjs().year() + 100) {
      return;
    }

    setDisplayDecade({
      start: displayDecade.start.add(changeBy * 10, "year"),
      end: displayDecade.end.add(changeBy * 10, "year"),
    });
  };

  const isDecadeInRange = useMemo(() => {
    return {
      next: maxDate ? displayDecade?.start.startOf("year").isBefore(minDate, "year") : true,
      prev: minDate ? displayDecade?.end.endOf("year").isAfter(maxDate, "year") : true,
    };
  }, [displayDecade, minDate, maxDate]);

  const decadeLabel = useMemo(() => {
    if (!displayDecade) {
      return "";
    }

    return `${displayDecade.start.format("YYYY")} - ${displayDecade.end.format("YYYY")}`;
  }, [displayDecade]);

  const isYearInValidRange = (year: Dayjs) => {
    if (minDate && year.isBefore(minDate, "year")) {
      return false;
    }

    if (maxDate && year.isAfter(maxDate, "year")) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <PickerHeader
        label={decadeLabel}
        onPrev={() => changeDecade(-1)}
        onNext={() => changeDecade(1)}
        controlsDisabled={{
          next: !isDecadeInRange.next,
          prev: !isDecadeInRange.prev,
        }}
      />

      <div className="grid grid-cols-3 justify-center">
        {Array.from({ length: 10 }).map((_, index) => {
          const year = displayDecade.start.add(index, "year");

          const isSelected = !!selectedYear && selectedYear.format("YYYY") === year.format("YYYY");
          const isDisabled = !isYearInValidRange(year);

          const isCurrentYear = dayjs().isSame(year, "year");

          return (
            <button
              key={index}
              data-selected={isSelected}
              type="button"
              disabled={isDisabled}
              onClick={() => selectYear(year.year())}
              className="px-0.5 py-1 disabled:opacity-50"
            >
              <div
                data-selected={isSelected}
                data-current={isCurrentYear && !isSelected}
                className={`size-full rounded-lg border border-transparent px-0.5 py-1 text-sm font-bold data-[current=true]:border-gray-900 data-[selected=true]:bg-gray-900 data-[selected=true]:text-white`}
              >
                {year.format("YYYY")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BaseModal } from "~/components/modal/BaseModal";
import { Input } from "~/components/ui/input";
import { removeActiveFocus } from "~/lib/clientHelpers";
import type { TOverlayRef } from "~/types/OverlayElement";
import { DayPicker } from "./DayPicker";
import { MonthPicker } from "./MonthPicker";
import { YearPicker } from "./YearPicker";

type TPickerType = "day" | "month" | "year";

interface IProps {
  pickerType?: TPickerType;
  initDate?: Dayjs;
  value?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  onChange?: (date: string) => void;
  onClear?: () => void;
  name?: string;
  placeholder?: string;
}

export const DatePicker = ({
  pickerType = "day",
  initDate,
  value,
  minDate,
  maxDate,
  onChange,
  name,
  placeholder = "",
}: IProps) => {
  const [selectedValue, setSelectedValue] = useState(initDate ?? null);
  const modalPickerRef = useRef(null) as TOverlayRef;

  // --- Handle selecting type of picker ---
  const onSelectionChange = (newValue: Dayjs) => {
    if (typeof onChange === "function") {
      onChange(newValue.toISOString());
    }

    setSelectedValue(newValue);

    modalPickerRef.current?.close();
    removeActiveFocus();
  };

  const formatValue = (value: Dayjs) => {
    return {
      day: value.format("D MMM YYYY"),
      month: value.format("MMMM"),
      year: value.format("YYYY"),
    }[pickerType];
  };

  const SelectedPicker = useMemo(() => {
    const picker = {
      day: DayPicker,
      month: MonthPicker,
      year: YearPicker,
    }[pickerType];

    if (!picker) {
      throw new Error(`Invalid picker type: ${pickerType}`);
    }

    return picker;
  }, [pickerType]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <>
      {createPortal(
        <>
          <BaseModal ref={modalPickerRef}>
            <SelectedPicker
              initDate={selectedValue ?? undefined}
              onChange={onSelectionChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          </BaseModal>
        </>,
        document.body,
      )}

      <button type="button" className="w-full" onClick={() => modalPickerRef.current?.open()}>
        <Input
          name={name}
          placeholder={placeholder}
          value={selectedValue ? formatValue(selectedValue) : ""}
          className="pointer-events-none"
          readOnly
        />
      </button>
    </>
  );
};

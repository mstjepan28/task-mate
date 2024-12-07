import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface IProps {
  label: string;
  onNext: () => void;
  onPrev: () => void;
  controlsDisabled: {
    next: boolean;
    prev: boolean;
  };
}

export const PickerHeader = ({ label, onPrev, onNext, controlsDisabled }: IProps) => {
  return (
    <div className="flex items-center py-2">
      <div data-testid="day-picker-date" className="text-xl font-bold capitalize mr-auto">
        {label}
      </div>

      <button
        type="button"
        onClick={() => onPrev()}
        className="px-3 py-1.5 text-gray-500 bg-gray-50 rounded-lg disabled:opacity-50"
        disabled={controlsDisabled.prev}
      >
        <HiArrowLeft size={24} />
      </button>

      <button
        type="button"
        onClick={() => onNext()}
        className="px-3 py-1.5 text-gray-500 bg-gray-50 rounded-lg disabled:opacity-50 ml-4"
        disabled={controlsDisabled.next}
      >
        <HiArrowRight size={24} />
      </button>
    </div>
  );
};

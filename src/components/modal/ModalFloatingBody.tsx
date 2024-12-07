import { twMerge } from "tailwind-merge";
import type { IModalBodyProps } from "./modalProps";

export const ModalFloatingBody = ({
  close,
  isOpen,
  classNameBody,
  classNameBackdrop,
  children,
  disableClosing,
}: IModalBodyProps) => {
  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!disableClosing) {
      close();
    }
  };

  const customStyles = `${isOpen ? "flex" : "hidden"} ${disableClosing ? "cursor-pointer" : ""}`;

  return (
    <div
      data-open={!!isOpen}
      data-clickable={!disableClosing}
      onClick={onBackdropClick}
      className={twMerge(
        `fixed inset-0 z-50 items-center justify-center bg-black/40 ${customStyles}`,
        classNameBackdrop,
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge("mx-4 w-full max-w-xs cursor-auto rounded-lg bg-white p-4 md:mx-0", classNameBody)}
      >
        {children}
      </div>
    </div>
  );
};

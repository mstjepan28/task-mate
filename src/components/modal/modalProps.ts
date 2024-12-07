import type { ReactNode } from "react";

type TModalType = "floating" | "popup";

interface IBaseModalProps {
  children?: ReactNode;
  classNameBody?: string;
  disableClosing?: boolean;
  classNameBackdrop?: string;
  closeOnOutsideClick?: boolean;
  animationDuration?: `${number}ms`;
}

export interface IModalProps extends IBaseModalProps {
  defaultOpen?: boolean;
  onOpen?: (arg?: unknown) => void;
  onClose?: (arg?: unknown) => void;
  forceState?: TModalType | undefined;
}

export interface IModalBodyProps extends IBaseModalProps {
  isOpen: boolean;
  close: () => void;
}

import type { MutableRefObject } from "react";
import type { useOverlayControls } from "../hooks/useOverlayControls";

export type TOverlayToggleOptions = {
  toggleSameState?: boolean;
  skipAnimation?: boolean;
};

export type TOverlayControls = {
  isOpen: ReturnType<typeof useOverlayControls>["isOpen"];
  open: ReturnType<typeof useOverlayControls>["openOverlay"];
  close: ReturnType<typeof useOverlayControls>["closeOverlay"];
};

export type TOverlayRef = MutableRefObject<TOverlayControls | null>;

export interface IOverlayElement {
  baseRef: TOverlayRef;
}

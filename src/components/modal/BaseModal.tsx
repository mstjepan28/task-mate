import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import type { IModalProps } from "./modalProps";
import { ModalFloatingBody } from "./ModalFloatingBody";
import { ModalPopupBody } from "./ModalPopupBody";
import { DisplaySize } from "~/enums/displaySize";
import { useOverlayControls } from "~/hooks/useOverlayControls";
import { useResponsive } from "~/hooks/useResponsive";
import type { TOverlayControls } from "~/types/OverlayElement";

export const BaseModal = forwardRef(function BaseModal(props: IModalProps, ref) {
  const controls = useOverlayControls({ ...props });
  const skipAnimationRef = useRef<boolean>(false);

  useImperativeHandle(ref, (): TOverlayControls => {
    return {
      open: (args, options) => {
        skipAnimationRef.current = !!options?.skipAnimation;
        controls.openOverlay(args, options);
      },
      close: (args, options) => {
        skipAnimationRef.current = !!options?.skipAnimation;
        controls.closeOverlay(args, options);
      },
      isOpen: controls.isOpen,
    };
  });

  const screenSize = useResponsive();

  /**
   * - ModalFloatingBody - Modal that is displayed as a floating element in
   *  the center of the screen.
   * - ModalPopupBody - Modal that pops up from the bottom of the screen,
   * can be dragged away to close it.
   */
  const Modal = useMemo(() => {
    if (props.forceState === "floating") {
      return ModalFloatingBody;
    }

    if (props.forceState === "popup") {
      return ModalPopupBody;
    }

    return screenSize > DisplaySize.MOBILE ? ModalFloatingBody : ModalPopupBody;
  }, [screenSize, props.forceState]);

  return (
    <Modal
      isOpen={controls.isOpen}
      close={controls.closeOverlay}
      classNameBody={props.classNameBody}
      disableClosing={props.disableClosing}
      classNameBackdrop={props.classNameBackdrop}
      animationDuration={skipAnimationRef.current ? "0ms" : props.animationDuration}
    >
      {props.children}
    </Modal>
  );
});

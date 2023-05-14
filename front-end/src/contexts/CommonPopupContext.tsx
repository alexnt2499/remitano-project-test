/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ContextValue {
  popupContext?: VaniPopupContext;
  openPopup: (type: PopupType, contents: PopupContents) => void;
  closePopup: () => void;
  openPopupWalletPopup: (type: PopupType, contents: PopupContents) => void;
}

type PopupType = "error" | "submit" | "submit-vertical" | "confirm";

interface PopupContents {
  title?: string;
  description?: string | unknown[];
  closeButtonTitle?: string;
  onClose?: () => void;
  submitButtonTitle?: string;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

interface VaniPopupContext {
  open: boolean;
  type?: PopupType;
  contents?: PopupContents;
}

let contextValue: ContextValue = {
  popupContext: { open: false },
  openPopup: () => {},
  closePopup: () => {},
  openPopupWalletPopup: () => {},
};

export const PopupContext = createContext<ContextValue>(contextValue);

interface Props {
  children: ReactNode;
}

export const PopupProvider = ({ children }: Props) => {
  const [context, setContext] = useState<VaniPopupContext | undefined>({
    open: true,
  });

  const openPopup = (type: PopupType, contents: PopupContents) => {
    setContext({
      open: true,
      type,
      contents,
    });
  };

  const openPopupWalletPopup = (type: PopupType, contents: PopupContents) => {
    setContext({
      open: false,
      type,
      contents,
    });
  };

  const closePopup = () => setContext({ ...context, open: false });

  contextValue = {
    ...contextValue,
    popupContext: context,
    openPopup,
    closePopup,
    openPopupWalletPopup,
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);

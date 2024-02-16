import React, { createContext, useState } from "react";

interface ActiveType {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  isClicked: {
    chat: boolean;
    cart: boolean;
    userProfile: boolean;
    notification: boolean;
  };
  setIsClicked: React.Dispatch<
    React.SetStateAction<{
      chat: boolean;
      cart: boolean;
      userProfile: boolean;
      notification: boolean;
    }>
  >;
  handleClick: (e: React.MouseEvent, clicked: string) => void;
  screenSize: number | null;
  setScreenSize: React.Dispatch<React.SetStateAction<number | null>>;
  anchorEl: EventTarget | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<EventTarget | null>>;
}

const initialState: ActiveType = {
  isActive: true,
  setIsActive: () => {},
  toggleSidebar: () => {},
  isClicked: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  },
  setIsClicked: () => {},
  handleClick: () => {},
  screenSize: null,
  setScreenSize: () => null,
  anchorEl: null,
  setAnchorEl: () => null,
};

export const StateContext = createContext<ActiveType>(initialState);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState<boolean>(initialState.isActive);
  const [isClicked, setIsClicked] = useState(initialState.isClicked);
  const [screenSize, setScreenSize] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(
    initialState.anchorEl
  );

  const toggleSidebar = () => {
    setIsActive((prevActive) => !prevActive);
  };

  function handleClick(e: React.MouseEvent, clicked: string) {
    setAnchorEl(e.currentTarget);
    setIsClicked(() => {
      return { ...initialState.isClicked, [clicked]: true };
    });
  }

  const value = {
    isActive,
    setIsActive,
    toggleSidebar,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    anchorEl,
    setAnchorEl,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export default ContextProvider;

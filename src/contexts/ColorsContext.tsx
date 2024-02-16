import React, { createContext, useState } from "react";

const initialColor = {
  backgrondColor: "bg-blue-500",
  selectedColor: "text-slate-100",
  setSelectedColor: () => {},
  changeColor: () => {},
  toggleDrawer: () => {},
  state: false,
  isDark: false,
  handleToggle: () => {},
};

type ColorTypes = {
  backgrondColor: string;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  changeColor: (color: string) => void;
  toggleDrawer: (
    ecent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  state: boolean;
  isDark: boolean;
  handleToggle: () => void;
};

export const ContextProvider = createContext<ColorTypes>(initialColor);
export default function ColorsContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedColor, setSelectedColor] = useState("blue-500");
  const [backgrondColor, setbackgrondColor] = useState("");
  const [state, setState] = useState(false);
  const [isDark, setIsDark] = React.useState(false);

  function handleToggle() {
    setIsDark((dark) => !dark);
  }

  const toggleDrawer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState((state) => !state);
  };

  function changeColor(color: string) {
    if (!color) return;
    setSelectedColor(color);
  }

  const values = {
    selectedColor,
    backgrondColor,
    setbackgrondColor,
    setSelectedColor,
    changeColor,
    toggleDrawer,
    state,
    isDark,
    handleToggle,
  };

  return (
    <ContextProvider.Provider value={values}>
      {children}
    </ContextProvider.Provider>
  );
}

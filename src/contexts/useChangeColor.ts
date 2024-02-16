import { useContext } from "react";
import { ContextProvider } from "./ColorsContext";

export function useChangeColor() {
  const context = useContext(ContextProvider);
  if (context === undefined) throw new Error("Error while using context");

  return context;
}

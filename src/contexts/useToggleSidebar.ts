import { useContext } from "react";
import { StateContext } from "./ContextProvider";

export function useStateContext() {
  const context = useContext(StateContext);

  if (context === undefined) throw Error("Error while getting context data");

  return context;
}

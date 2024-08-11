import { ReactNode, createContext, useCallback, useContext } from "react";

export const ForceUpdateContext = createContext<(() => void) | undefined>(
  undefined,
);

export const useForceUpdateProvider =
  (reducer: () => void) =>
  ({ children }: { children: ReactNode }) => {
    console.log("useForceUpdateProvider", reducer);
    return (
      <ForceUpdateContext.Provider value={reducer}>
        {children}
      </ForceUpdateContext.Provider>
    );
  };

export const useForceUpdate = () => {
  return useContext(ForceUpdateContext);
};

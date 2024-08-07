import { eventBus } from "@/app/_layout";
import { Store, StoreConstructor } from "@/stores/Store";
import {
  Context,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";

export const useInitStore = <T extends Store>(
  name: string,
  Constructor: StoreConstructor<T>,
) => {
  const store = useMemo(() => new Constructor(eventBus, name), [Constructor]);

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);

  return store;
};

export const useStore = <T extends Store>(context: Context<T | undefined>) => {
  const store = useContext(context);

  if (!store) throw new Error("Using store before initialization");
  return store;
};

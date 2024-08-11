import Navigation from "@/components/Navigation";
import { EventBus } from "@/event_bus/EventBus";
import { Storage } from "@/db/Storage";
import { RequestManager } from "@/request_manager/RequestManager";
import { useEffect, useReducer, useState } from "react";
import { getItem } from "expo-secure-store";
import AppWrapper from "@/components/AppWrapper";
import Authorization from "@/components/Authorization";
import { useForceUpdateProvider } from "@/hooks/useForceUpdate";

export const eventBus = new EventBus();
export const storage = new Storage(eventBus);
export const requestManager = new RequestManager(eventBus);

export default function RootLayout() {
  const [authorized, setAuthorized] = useState(false);
  const [, reducer] = useReducer((x) => x + 1, 0);
  const ForceUpdateProvider = useForceUpdateProvider(reducer);

  useEffect(() => {
    if (getItem("access_token")) {
      setAuthorized(true);
      return;
    }

    setAuthorized(false);
  });

  if (!authorized)
    return (
      <AppWrapper>
        <ForceUpdateProvider>
          <Authorization />
        </ForceUpdateProvider>
      </AppWrapper>
    );

  return (
    <AppWrapper>
      <ForceUpdateProvider>
        <Navigation items={[{ path: "index", name: "Home", icon: "home" }]} />
      </ForceUpdateProvider>
    </AppWrapper>
  );
}

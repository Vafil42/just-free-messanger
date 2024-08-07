import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import Navigation from "@/components/Navigation";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { EventBus } from "@/event_bus/EventBus";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const eventBus = new EventBus();

export default function RootLayout() {
  const theme = useColorScheme() === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation items={[{ path: "index", name: "Home", icon: "home" }]} />
        </SafeAreaProvider>
      </PaperProvider>
    </>
  );
}

import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface AppWrapperProps {
  children: ReactNode;
}
const AppWrapper = (props: AppWrapperProps) => {
  const theme = useColorScheme() === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <PaperProvider theme={theme}>
        <SafeAreaProvider>{props.children}</SafeAreaProvider>
      </PaperProvider>
    </>
  );
};

export default AppWrapper;

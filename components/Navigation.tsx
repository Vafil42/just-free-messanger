import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NavigationItem {
  path: string;
  name: string;
  icon: string;
}

interface NavigationProps {
  items: NavigationItem[];
}

const Navigation = (props: NavigationProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={theme.dark ? DarkTheme : DefaultTheme}>
        <Drawer
          screenOptions={{
            title: "Just Free Messanger",
            headerTintColor: theme.dark
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
            drawerStyle: {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          }}
        >
          {props.items.map((item) => (
            <Drawer.Screen
              key={item.path}
              name={item.path}
              options={{
                drawerLabel: item.name,
              }}
            />
          ))}
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Navigation;

import { Drawer } from "expo-router/drawer";
import {
  DrawerLayout,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Button, Divider, useTheme } from "react-native-paper";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useForceUpdate } from "@/hooks/useForceUpdate";

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
  const forceUpdate = useForceUpdate();

  const onExitClick = useCallback(async () => {
    console.log("exit", forceUpdate);
    await deleteItemAsync("access_token");
    console.log(await getItemAsync("access_token"));
    forceUpdate?.();
  }, []);

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
          drawerContent={(props) => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Exit" onPress={onExitClick} />
            </DrawerContentScrollView>
          )}
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

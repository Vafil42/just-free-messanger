import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View>{children}</View>
    </ScrollView>
  );
};

export default ScreenWrapper;

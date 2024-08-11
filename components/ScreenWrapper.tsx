import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({
  children,
  top,
}: {
  children: ReactNode;
  top?: true;
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        paddingTop: top ? insets.top : 0,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScreenWrapper;

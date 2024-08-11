import { useState } from "react";
import { View } from "react-native";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Snackbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Authorization = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 32,
          paddingRight: insets.right + 32,
          width: "100%",
          height: "100%",
          backgroundColor: theme.colors.background,
          display: "flex",
        }}
      >
        {isSignUp ? (
          <SignUp showSignIn={() => setIsSignUp(false)} onError={setError} />
        ) : (
          <SignIn showSignUp={() => setIsSignUp(true)} onError={setError} />
        )}
      </View>
      <Snackbar
        visible={!!error}
        onDismiss={() => {
          setError(undefined);
        }}
        duration={5000}
      >
        {error || ""}
      </Snackbar>
    </>
  );
};

export default Authorization;

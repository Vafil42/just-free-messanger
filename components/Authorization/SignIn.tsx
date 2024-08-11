import { observer } from "mobx-react-lite";
import InputWithError from "../InputWithError";
import { useInitStore } from "@/hooks/useStore";
import { SignInStore } from "@/stores/SignInStore";
import { useCallback, useState } from "react";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useForceUpdate } from "@/hooks/useForceUpdate";

interface SignInProps {
  showSignUp: () => void;
  onError: (error: string) => void;
}

const SignIn = (props: SignInProps) => {
  const [loading, setLoading] = useState(false);
  const signInStore = useInitStore("sign_in_store", SignInStore);
  const forceUpdate = useForceUpdate();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const error = await signInStore.submit();
    setLoading(false);
    console.log(forceUpdate);
    forceUpdate?.();
    if (!error) return;
    props.onError(error);
  }, [signInStore]);

  return (
    <>
      <Text
        variant="displayMedium"
        style={{ paddingBottom: 50, textAlign: "center" }}
      >
        Just Free Messanger
      </Text>
      <InputWithError
        placeholder="Username"
        value={signInStore.username}
        onChange={signInStore.setUsername}
        error={signInStore.usernameError.get()}
      />
      <InputWithError
        placeholder="Password"
        value={signInStore.password}
        onChange={signInStore.setPassword}
        error={signInStore.passwordError.get()}
        password
      />
      <Button mode="contained" loading={loading} onPress={handleSubmit}>
        Sign In
      </Button>
      <View style={{ paddingTop: 32 }}>
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", padding: 0, margin: 0 }}
        >
          Don't have account yet?
        </Text>
        <Button mode="text" onPress={props.showSignUp}>
          Sign up
        </Button>
      </View>
    </>
  );
};

export default observer(SignIn);

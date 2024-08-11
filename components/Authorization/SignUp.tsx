import { observer } from "mobx-react-lite";
import InputWithError from "../InputWithError";
import { useInitStore } from "@/hooks/useStore";
import { SignInStore } from "@/stores/SignInStore";
import { useCallback, useState } from "react";
import { Button, Text } from "react-native-paper";
import { SignUpStore } from "@/stores/SignUpStore";
import { useForceUpdate } from "@/hooks/useForceUpdate";

interface SignUpProps {
  showSignIn: () => void;
  onError: (error: string) => void;
}

const SignUp = (props: SignUpProps) => {
  const [loading, setLoading] = useState(false);
  const signUpStore = useInitStore("sign_up_store", SignUpStore);
  const forceUpdate = useForceUpdate();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const error = await signUpStore.submit();
    setLoading(false);
    forceUpdate?.();
    if (!error) return;

    props.onError(error);
  }, [signUpStore]);

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
        value={signUpStore.username}
        onChange={signUpStore.setuserName}
        error={signUpStore.usernameError.get()}
        help="Will be used for logining and finding you"
      />
      <InputWithError
        placeholder="Password"
        value={signUpStore.password}
        onChange={signUpStore.setPassword}
        error={signUpStore.passwordError.get()}
        password
      />
      <InputWithError
        placeholder="Name"
        value={signUpStore.name}
        onChange={signUpStore.setName}
        error={signUpStore.nameError.get()}
        help="Will be displayed in chats"
      />
      <Button mode="contained" loading={loading} onPress={handleSubmit}>
        Sign Up
      </Button>
      <Button mode="text" onPress={props.showSignIn} style={{ marginTop: 16 }}>
        Back to Sign In
      </Button>
    </>
  );
};

export default observer(SignUp);

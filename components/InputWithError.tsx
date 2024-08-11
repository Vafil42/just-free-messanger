import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

interface InputWithErrorProps {
  error?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  password?: true;
  help?: string;
}

const InputWithError = (props: InputWithErrorProps) => {
  return (
    <View>
      <TextInput
        mode="outlined"
        label={props.placeholder}
        value={props.value}
        onChangeText={props.onChange}
      />
      {props.help && (
        <HelperText type="info" visible={!!props.help}>
          {props.help}
        </HelperText>
      )}
      <HelperText visible={!!props.error} type="error">
        {props.error}
      </HelperText>
    </View>
  );
};

export default observer(InputWithError);

import { Text, TextInput, View, StyleSheet } from "react-native";

export default function MyTextInput({
  label,
  onChangeText,
  secure = false,
}: {
  label: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 315,
    height: 45,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
  },
});

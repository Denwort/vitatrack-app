import { Text, TextInput, View, StyleSheet } from "react-native";

export default function MyTextInput({
  label,
  // onChangeText = () => {},
}: {
  label: string;
  // onChangeText: VoidFunction;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
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
  },
  label: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
  },
});

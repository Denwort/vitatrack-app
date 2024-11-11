import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export default function MyButton({
  label,
  outlined,
  onPress,
}: {
  label: string;
  outlined: boolean;
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: outlined
            ? pressed
              ? "#E5E5E5"
              : "transparent"
            : pressed
              ? "#E3D8CB"
              : "#F1E5D7",
          borderColor: outlined ? "#B1AEAB" : "transparent",
        },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 20,
          textAlign: "center",
          color: outlined ? "#B1AEAB" : "#000000",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 214,
    height: 45,
    borderRadius: 15,
    borderWidth: 2,
    paddingTop: 5,
  },
});

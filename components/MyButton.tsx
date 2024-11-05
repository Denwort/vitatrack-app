import { Pressable, Text } from "react-native";

export default function MyButton({
  label,
  outlined,
}: {
  label: string;
  outlined: boolean;
}) {
  return (
    <Pressable
      style={{
        width: 214,
        height: 45,
        borderRadius: 15,
        borderColor: outlined ? "#B1AEAB" : "transparent",
        borderWidth: 2,
        backgroundColor: outlined ? "transparent" : "#F1E5D7",
        paddingTop: 5,
      }}
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

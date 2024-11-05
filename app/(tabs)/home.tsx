import MyButton from "@/components/MyButton";
import MyTextInput from "@/components/MyTextInput";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View>
      <MyTextInput label="Prueba" />
      <MyButton label={"Prueba"} outlined={false} />
    </View>
  );
}

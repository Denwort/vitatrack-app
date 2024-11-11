import MyButton from "@/components/MyButton";
import MyTextInput from "@/components/MyTextInput";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView>
      <MyTextInput label="Prueba" />
      <MyButton label={"Prueba"} outlined={false} />
    </SafeAreaView>
  );
}

import ChatInput from "@/components/ChatInput";
import MyButton from "@/components/MyButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Friends() {
  const router = useRouter();
  const handleChat = () => {
    router.push("/chat");
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 15 }}>
        <MyButton label="Chat" onPress={handleChat} outlined={true} />
      </View>
    </SafeAreaView>
  );
}

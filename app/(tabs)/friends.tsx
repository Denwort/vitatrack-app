import chatAPI from "@/api/chatApi";
import MyButton from "@/components/MyButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Friends() {
  const router = useRouter();
  const handleChat = async () => {
    const participant1: string = "123";
    const participant2: string = "456";

    const chat = await chatAPI.createOrGetChat(participant1, participant2);

    console.log(chat);

    router.push({
      pathname: "/chat",
      params: {
        participant1: participant1,
        participant2: participant2,
        chat: chat._id,
      },
    });
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 15 }}>
        <MyButton label="Chat" onPress={handleChat} outlined={true} />
      </View>
    </SafeAreaView>
  );
}

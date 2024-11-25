import BackIcon from "@/components/BackIcon";
import ChatInput from "@/components/ChatInput";
import MoreIcon from "@/components/MoreIcon";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBubble from "react-native-chat-bubble";
import { useRouter } from "expo-router";

export default function ChatScreen() {
  const [changeText, setChangeText] = useState<string>("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#D6D6D6" : "transparent",
                  paddingTop: 8,
                },
                styles.touchables,
              ]}
              onPress={() => router.back()}
            >
              <BackIcon />
            </Pressable>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image source={require("@/assets/images/user.png")} />
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Poppins-Medium",
                  marginTop: 5,
                }}
              >
                User
              </Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#D6D6D6" : "transparent",
                paddingTop: 12,
              },
              styles.touchables,
            ]}
          >
            <MoreIcon />
          </Pressable>
        </View>
      </View>
      <View style={styles.chatContainer}>
        <ScrollView style={styles.messages}>
          <ChatBubble
            isOwnMessage={true}
            bubbleColor="#1084ff"
            tailColor="#1084ff"
            withTail={true}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "Poppins-Medium",
              }}
            >
              Your message content
            </Text>
          </ChatBubble>
        </ScrollView>
        <View style={{ marginBottom: 15 }}>
          <ChatInput onChangeText={setChangeText} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "black",
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    width: "100%",
  },
  touchables: {
    display: "flex",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
  },
  chatContainer: {
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
    flexGrow: 1,
  },
  messages: {
    marginBottom: 15,
  },
});

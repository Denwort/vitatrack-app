import BackIcon from "@/components/BackIcon";
import ChatInput from "@/components/ChatInput";
import MoreIcon from "@/components/MoreIcon";
import { useEffect, useRef, useState } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import socket from "../utils/socket";
import messageAPI from "@/api/messageApi";

export default function ChatScreen() {
  const [changeText, setChangeText] = useState<string>("");
  const [messages, setMessages] = useState<object[] | never[]>([]);

  const router = useRouter();
  const { participant1, particiapant2, chat } = useLocalSearchParams();

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    function onMessage(data: {
      chat: string;
      senderId: string;
      content: string;
    }) {
      console.log("Mensaje:", data);
      setMessages((message) => [...message, data]);
    }

    async function getMessages(chat: string) {
      const message = await messageAPI.getMessage(chat);
      setMessages(message);
    }
    getMessages(chat as string);

    handleConnection();

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [messages]);

  const handleConnection = async () => {
    socket.emit("username", participant1);
    socket.connect();
  };

  const handleInputChange = (text: string) => {
    if (text.includes("\n")) {
      handleSubmit();
    } else {
      setChangeText(text);
    }
  };

  const handleSubmit = () => {
    if (!changeText.trim()) return;
    const data = {
      senderId: "",
      content: changeText.trim(),
    };
    setMessages((message) => [...message, data]);
    socket.emit("message", data);
    setChangeText("");
  };

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
        <ScrollView style={styles.messages} ref={scrollViewRef}>
          {messages?.map((message, key) => {
            return (
              <ChatBubble
                key={key}
                isOwnMessage={participant1 === message.senderId}
                bubbleColor={
                  participant1 === message.senderId ? "#1084ff" : "#C6C6C6"
                }
                tailColor={
                  participant1 === message.senderId ? "#1084ff" : "#C6C6C6"
                }
                withTail={true}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {message.content}
                </Text>
              </ChatBubble>
            );
          })}
        </ScrollView>
        <View style={{ marginBottom: 15 }}>
          <ChatInput onChangeText={handleInputChange} value={changeText} />
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
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexGrow: 1,
  },
  messages: {
    marginBottom: 15,
  },
});

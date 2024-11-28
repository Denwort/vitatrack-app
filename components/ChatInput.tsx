import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import EmojiIcon from "./EmojiIcon";
import LinkIcon from "./LinkIcon";
import { useState } from "react";
import RecordIcon from "./RecordIcon";

interface ChatInputProps {
  onChangeText: (text: string) => void;
  value: string;
}

export default function ChatInput({ onChangeText, value }: ChatInputProps) {
  const [inputHeight, setInputHeight] = useState<number>(47);

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { height: inputHeight }]}>
        <View style={styles.input1}>
          <EmojiIcon />
          <TextInput
            placeholder="Message"
            multiline={true}
            value={value}
            onChangeText={onChangeText}
            onContentSizeChange={(event) => {
              setInputHeight(
                Math.max(47, event.nativeEvent.contentSize.height),
              );
            }}
            style={{
              fontSize: 22,
              display: "flex",
              width: 220,
              marginBottom: 3,
            }}
          />
        </View>
        <LinkIcon />
      </View>
      <TouchableOpacity style={styles.record} activeOpacity={0.7}>
        <RecordIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 25,
    backgroundColor: "#DBD8D5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
  },
  input1: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  record: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    backgroundColor: "#F1E5D7",
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
});

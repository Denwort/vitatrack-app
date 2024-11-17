import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import DropdownIcon from "./DropdownIcon";
import CloseIcon from "./CloseIcon";

interface DropdownProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: { label: string; value: string } | null;
  setSelectedValue: (value: { label: string; value: string } | null) => void;
}

export default function MyDropdown({
  label,
  options,
  selectedValue,
  setSelectedValue,
}: DropdownProps) {
  const [showOptions, setShowOptions] = useState(false);

  const optionsList = () => {
    return (
      <Modal visible={showOptions} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium" }}>
                Select an option:
              </Text>
              <Pressable
                onPress={() => setShowOptions(!showOptions)}
                style={({ pressed }) => [
                  {
                    padding: 3,
                    borderRadius: 5,
                    backgroundColor: pressed ? "#EAEAEA" : "transparent",
                  },
                ]}
              >
                <CloseIcon />
              </Pressable>
            </View>
            <View style={styles.modalOptions}>
              {options.map((option, key) => {
                return (
                  <Pressable
                    key={key}
                    onPress={() => {
                      setSelectedValue(option);
                      setShowOptions(!showOptions);
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? "#EAEAEA" : "transparent",
                      },
                    ]}
                  >
                    <View style={styles.modalTouchable}>
                      <Text style={styles.modalText}>{option.label}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Text style={styles.text}>
          {selectedValue ? selectedValue.label : options[0].label}
        </Text>
        <Pressable
          onPress={() => setShowOptions(!showOptions)}
          style={({ pressed }) => [
            {
              paddingRight: 5,
              paddingLeft: 5,
              paddingTop: 7,
              paddingBottom: 7,
              borderRadius: 5,
              backgroundColor: pressed ? "#EAEAEA" : "transparent",
            },
          ]}
        >
          <DropdownIcon />
        </Pressable>
      </View>
      {showOptions && optionsList()}
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
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modal: {
    backgroundColor: "white",
    marginLeft: "10%",
    marginRight: "10%",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  modalOptions: {
    display: "flex",
    flexDirection: "column",
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  modalTouchable: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

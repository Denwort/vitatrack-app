import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import DropdownIcon from "./DropdownIcon";

interface TimeRangePickerProps {
  startTime: Date;
  endTime: Date;
  setStartTime: (date: Date) => void;
  setEndTime: (date: Date) => void;
}

export default function TimeRangePicker({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}: TimeRangePickerProps) {
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  const handleStartChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) {
      const endTime = new Date(selectedDate.getTime() + 60000);
      setStartTime(selectedDate);
      setEndTime(endTime);
    }
    setShowStartPicker(false);
  };

  const handleEndChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setEndTime(selectedDate);
    }
    setShowEndPicker(false);
  };

  return (
    <View style={{ width: 315 }}>
      <Text style={styles.label}>Time range</Text>

      <View style={styles.timeRow}>
        <View style={styles.timeContainer}>
          <Text style={styles.hour}>Start:</Text>
          <View style={styles.hourContainer}>
            <Text style={styles.hour}>
              {startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
              })}
            </Text>
            <Pressable
              onPress={() => setShowStartPicker(true)}
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
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.hour}>End:</Text>
          <View style={styles.hourContainer}>
            <Text style={styles.hour}>
              {endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
              })}
            </Text>
            <Pressable
              onPress={() => setShowEndPicker(true)}
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
        </View>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleStartChange}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleEndChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
  },
  hour: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  hourContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width: 96,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

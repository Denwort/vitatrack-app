import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";

interface CalendarProps {
  calendar: { date: string; day: string }[];
  selectedDate: string | null;
  setSelectedDate: (value: string | null) => void;
}

export default function Calendar({
  calendar,
  selectedDate,
  setSelectedDate,
}: CalendarProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const onPress = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  useEffect(() => {
    if (scrollViewRef.current && selectedDate) {
      const index = calendar.findIndex((day) => day.date === selectedDate);
      if (index !== -1) {
        scrollViewRef.current.scrollTo({
          x: index * 50,
          animated: false,
        });
      }
    }
  }, [calendar]);

  return (
    <ScrollView horizontal={true} style={{ margin: 10 }} ref={scrollViewRef}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {calendar.map((day, key) => {
          return (
            <View style={styles.container} key={key}>
              <Text style={styles.text}>{day.day.slice(0, 1)}</Text>
              <Pressable
                style={[
                  {
                    backgroundColor:
                      selectedDate === day.date ? "#F1E5D7" : "#D9D9D9",
                  },
                  styles.pressable,
                ]}
                onPress={() => onPress(day.date)}
                key={day.date}
              >
                <Text style={styles.text}>{day.date}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  pressable: {
    padding: 7,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
});

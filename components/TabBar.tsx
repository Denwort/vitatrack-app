import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabAddIcon from "./navigation/TabAddIcon";
import TabSettingsIcon from "./navigation/TabSettingsIcon";
import TabHomeIcon from "./navigation/TabHomeIcon";
import TabStatIcon from "./navigation/TabStatsIcon";
import TabFriendsIcon from "./navigation/TabFriendsIcon";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icon: any = {
    index: () => <TabHomeIcon />,
    reports: () => <TabStatIcon />,
    addHabit: () => <TabAddIcon />,
    friends: () => <TabFriendsIcon />,
    settings: () => <TabSettingsIcon />,
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              paddingBottom: 15,
              paddingTop: 15,
              backgroundColor: isFocused ? "#F1E5D7" : "white",
            }}
          >
            {icon[route.name]()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
  },
});

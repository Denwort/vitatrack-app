// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import ReportsScreen from './reports';
import AddHabitScreen from './addHabit';
import FriendsScreen from './friends';
import SettingsScreen from './settings';
import TabBar from '../../components/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />} // Usar tu TabBar personalizado
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="reports" component={ReportsScreen} />
      <Tab.Screen name="addHabit" component={AddHabitScreen} />
      <Tab.Screen name="friends" component={FriendsScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

/** @format */

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NotificationScreen, NotificationDetailsScreen } from "../screens";

const Stack = createStackNavigator();

const NotifyNavigator = ({ route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Notify"
        component={NotificationScreen}
        initialParams={{
          data: route.params.data,
        }}
      />
      <Stack.Screen
        name="NotifyDetails"
        component={NotificationDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default NotifyNavigator;

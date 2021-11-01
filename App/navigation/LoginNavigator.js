/** @format */

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SignUpScreen, MentorsLogin } from "../screens";

import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Mentor" component={MentorsLogin} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;

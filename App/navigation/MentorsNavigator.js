/** @format */

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { OurMentors, AllMentors, MentorProfile } from "../screens";

const Stack = createStackNavigator();

const MentorsNavigator = ({ route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Our"
        component={OurMentors}
        initialParams={{
          data: route.params.data,
        }}
      />
      <Stack.Screen name="Our All" component={AllMentors} />
      <Stack.Screen 
      name="MentorProfile" 
      component={MentorProfile} 
      // initialParams={{
      //   data: route.params.data,
      // }}
      />
    </Stack.Navigator>
  );
};

export default MentorsNavigator;

/** @format */

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, PostQuestion } from "../screens";

const Stack = createStackNavigator();

const HomeNavigator = ({ route }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='Home Screen' component={HomeScreen}
                initialParams={{
                    data: route.params.data,
                }}
            />
            <Stack.Screen name='Post' component={PostQuestion} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;

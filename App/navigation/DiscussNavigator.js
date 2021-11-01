/** @format */

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { DiscussScreen, PostQuestion } from "../screens";

const Stack = createStackNavigator();

const DiscussNavigator = ({ route }) => {
    return (
        <Stack.Navigator
            initialRouteName='Discuss'
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='Discuss' component={DiscussScreen} 
                initialParams={{
                    data: route.params.data,
                }}
            />
            <Stack.Screen name='Post Question' component={PostQuestion} />
        </Stack.Navigator>
    );
};

export default DiscussNavigator;

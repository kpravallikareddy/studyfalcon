/** @format */

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { Platform, StyleSheet, StatusBar as sb } from "react-native";

import AppLoading from "expo-app-loading";

import { createStore } from "redux";

import { Provider } from "react-redux";
import store from "./store";

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { LoginNavigator, DrawerNavigator } from "./App/navigation";

export default function App() {
    const [fontsLoaded] = useFonts({
        Autumn: require("./assets/fonts/Autumn.ttf"),
        Anton: require("./assets/fonts/Anton-Regular.ttf"),
        Jacques: require("./assets/fonts/Jacques.ttf"),
        MontserratExtraLight: require("./assets/fonts/Montserrat-ExtraLight.ttf"),
        MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
        MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratExtraBold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
        MontserratThin: require("./assets/fonts/Montserrat-Thin.ttf"),
        MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            // <View style={styles.container}>
            //     <DiscussScreen />
            // </View>
            <>
                <Provider store={store}>
                    <NavigationContainer>
                        <LoginNavigator />
                    </NavigationContainer>
                </Provider>
                {/* <Provider store={store}>
                    <NavigationContainer>
                        <DrawerNavigator />
                    </NavigationContainer>
                </Provider> */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: Platform.OS === "android" ? sb.currentHeight : 20,
    },
});

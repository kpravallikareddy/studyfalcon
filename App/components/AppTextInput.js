/** @format */
/** @format */

import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppTextInput({
    iconName,
    placeholder,
    style,
    onPress,
    pass = null,
    onChangeText,
    iconRight = null,
}) {
    const [eye, setEye] = useState(true);

    if (pass === null) {
        return (
            <View style={[styles.container, style]}>
                {iconName && (
                    <MaterialCommunityIcons
                        name={iconName}
                        size={24}
                        color='black'
                        style={{ marginRight: 10 }}
                    />
                )}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor='black'
                    style={styles.textStyle}
                    onChangeText={onChangeText}
                />
                {iconRight && (
                    <TouchableOpacity onPress={onPress}>
                        <MaterialCommunityIcons
                            name={iconRight}
                            size={25}
                            color='black'
                            style={styles.iconStyle}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    } else {
        return (
            <View style={[styles.container, style]}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color='black'
                    style={{ marginRight: 10 }}
                />
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor='black'
                    style={styles.textStyle}
                    secureTextEntry={eye}
                    onChangeText={onChangeText}
                />
                {pass && (
                    <TouchableOpacity onPress={() => setEye(!eye)}>
                        <MaterialCommunityIcons
                            name='eye'
                            size={24}
                            color='black'
                            style={styles.iconStyle}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        opacity: 0.45,
        height: 45,
        width: "84%",
        borderRadius: 10,
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 2,
        paddingLeft: 25,
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 18,
        fontFamily: "MontserratRegular",
        color: "black",
        flex: 1,
    },
    iconStyle: {
        marginRight: 15,
    },
});

/** @format */

import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, DIM } from "../../constants";

export default function PickerItemComponent({ arr, text, onPress }) {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => {
                setPressed(!pressed);
                onPress();
            }}
            style={{
                backgroundColor: "white",
                height: DIM.height * 0.09,
                width: DIM.width * 0.85,
                borderRadius: 10,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
            }}>
            {!arr.includes(text) && (
                <Text
                    style={{
                        fontSize: 24,
                        color: COLORS.light,
                        fontFamily: "MontserratRegular",
                    }}>
                    {text}
                </Text>
            )}
            {arr.includes(text) && (
                <>
                    <Text
                        style={{
                            fontSize: 24,
                            color: COLORS.light,
                            fontFamily: "MontserratRegular",
                            flex: 1,
                            marginLeft: 20,
                        }}>
                        {text}
                    </Text>
                    <MaterialCommunityIcons
                        color={COLORS.light}
                        name='check-circle'
                        size={30}
                        style={{ marginRight: 20 }}
                    />
                </>
            )}
        </TouchableOpacity>
    );
}

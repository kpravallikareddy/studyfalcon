/** @format */

import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, DIM } from "../../constants";

export default function PickerItemComponent({ text, onPress }) {
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
            <Text
                style={{
                    fontSize: 24,
                    color: COLORS.light,
                    fontFamily: "MontserratRegular",
                }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

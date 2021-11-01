/** @format */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS, DIM } from "../../constants";

export default function Buttons({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: DIM.width * 0.84,
        backgroundColor: COLORS.light,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        // marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontFamily: "MontserratRegular",
        color: COLORS.white,
        textAlign: "center",
    },
});

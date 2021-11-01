/** @format */

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DIM } from "../../constants";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

export default function CustomButton({
  style,
  flag = null,
  text = "Report Abuse",
  onPress = null,
  font_size = 18,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        flexDirection: "row",
        height: 50,
        width: DIM.width * 0.7,
        backgroundColor: "transparent",
        borderRadius: 10,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        ...style,
      }}
    >
      {flag == null && (
        <MaterialCommunityIcons
          name="flag"
          size={25}
          color={"tomato"}
          style={{ marginRight: 8 }}
        />
      )}
      {flag !== null && (
        <Entypo
          name="attachment"
          size={25}
          color="grey"
          style={{ marginRight: 15 }}
        />
      )}

      <Text
        style={{
          fontSize: font_size,
          fontFamily: "MontserratRegular",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

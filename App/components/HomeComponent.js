/** @format */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { DIM, SIZES, COLORS } from "../../constants";

export default function HomeComponent({ text, onPress, textBelow = null }) {
    return (
        <>
            <View
                style={{
                    backgroundColor: COLORS.light,
                    height: 50,
                    width: 180,
                    marginLeft: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text
                    style={{
                        color: COLORS.white,
                        fontSize: 20,
                        fontFamily: "MontserratRegular",
                    }}>
                    {text}
                </Text>
            </View>
            <View
                style={{
                    height: 1,
                    width: DIM.width * 0.9,
                    marginLeft: 20,
                    backgroundColor: COLORS.light,
                }}></View>
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 15,
                    justifyContent: "center",
                    marginBottom: 20,
                }}>
                {/* {textBelow !== null && (
                    <>
                        <Text
                            style={{
                                color: COLORS.black,
                                fontSize: 20,
                                marginRight: 10,
                                fontFamily: "MontserratRegular",
                            }}>
                            Nothing posted.
                        </Text>
                        <TouchableOpacity onPress={onPress}>
                            <Text
                                style={{
                                    color: COLORS.light,
                                    fontSize: 20,
                                    fontFamily: "MontserratExtraBold",
                                }}>
                                Post now
                            </Text>
                        </TouchableOpacity>
                    </>
                )} */}
            </View>
        </>
    );
}

const styles = StyleSheet.create({});

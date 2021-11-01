/** @format */

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DIM } from "../../constants";

export default function MentorItem({
    image1 = null,
    image2 = null,
    name,
    exp,
    name1,
    exp1,
}) {
    return (
        <View style={{ marginBottom: 10 }}>
            <View
                style={{
                    // backgroundColor: "red",
                    height: DIM.height * 0.1,
                    width: DIM.width,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 160,
                }}>
                {image1 !== null && (
                    <View>
                        <Image
                            source={{ uri: image1 }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 100,
                            }}
                        />
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 20,
                                fontFamily: "MontserratMedium",
                            }}>
                            {name}
                        </Text>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 20,
                                fontFamily: "MontserratMedium",
                            }}>
                            {exp}
                        </Text>
                    </View>
                )}
                {image2 !== null && (
                    <View>
                        <Image
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 100,
                            }}
                            source={{ uri: image2 }}
                        />
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 20,
                                fontFamily: "MontserratMedium",
                            }}>
                            {name1}
                        </Text>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 20,
                                fontFamily: "MontserratMedium",
                            }}>
                            {exp1}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

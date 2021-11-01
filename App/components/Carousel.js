/** @format */
import React, { Component } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default class Carousel extends Component {
    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    height: 230,
                }}
                ref={(node) => this.scroll = node}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {this.props.data.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                height: 150,
                                width: 150,
                                marginRight: 20,
                                marginBottom: 10,
                                borderRadius: 75,
                                marginLeft:15,
                            }}>
                            <Image
                                source={
                                    { uri: item.profile_image }
                                }
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 75,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontFamily: "MontserratMedium",
                                    textAlign: "center",
                                }}>
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: "MontserratRegular",
                                    textAlign: "center",
                                }}>
                                {item.expertise}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

/** @format */

import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DIM, COLORS, baseUrl } from "../../constants";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "./Icon";
import CustomButton from "./CustomButton";

export default function AnswerComponent({
  answer,
  upvote,
  downvote,
  datetime,
  answeredby_user_id,
}) {
  const [idName, setIdName] = useState();
  const [profileImage, setProfileImage] = useState();

  if (answeredby_user_id !== null) {
    const getName = async () => {
      let response1 = await fetch(
        baseUrl + "/mentors_profile/" + answeredby_user_id,
        {
          method: "GET",
        }
      );
      let json1 = await response1.json();
      setIdName(json1.Data.name);
      setProfileImage(json1.Data.profile_image);
    };

    getName();
  }

  return (
    <View>
      <View
        style={{
          marginLeft: DIM.width * 0.07,
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "red",
            borderColor: "red",
            borderWidth: 3,
          }}
        >
          <Image
            source={{
              uri: profileImage,
            }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 45,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            // backgroundColor: "red",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              color={COLORS.light}
              size={20}
              style={{ marginRight: 5 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontStyle: "italic",
                color: "slategrey",
                marginRight: 5,
              }}
            >
              Verified Answer by
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 17,
                color: COLORS.light,
              }}
            >
              {idName}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                marginLeft: 5,
              }}
            >
              {answer}
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 18,
                marginTop: 7,
                marginLeft: 5,
              }}
            >
              {datetime}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: DIM.width * 0.3475,
        }}
      >
        <Icon name="thumb-up" color="green" num={upvote} />
        <Icon name="thumb-down" color="red" num={downvote} />
      </View>
      <CustomButton style={{ marginLeft: DIM.width * 0.14 }} />
    </View>
  );
}

const styles = StyleSheet.create({});

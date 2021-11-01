/** @format */

import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import HTMLView from "react-native-htmlview";

import { DIM, COLORS, months, weekdayStr } from "../../constants";

import * as DocumentPicker from "expo-document-picker";

import CustomButton from "../components/CustomButton";
import Icon from "../components/Icon";
import AnswerComponent from "./AnswerComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let allReply = [];

export default function QuesAns({ item, image, username }) {
  //This shows the question creation time... just below, the name...

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      Alert.alert("Study Falcon", "Nothing Selected");
    }
  };

  // console.log(answeredby_user_id);

  const placeholderText = "What is in your mind, " + username + "?";

  let y = item.created_at.substr(0, 4);
  let m = parseInt(item.created_at.substr(5, 7));
  let mS = months[m - 1];
  let d = item.created_at.substr(8, 2);
  let wd = new Date(item.created_at.substr(0, 10)).getDay();

  let dateAc = weekdayStr[wd];
  let dt = dateAc + ", " + mS + " " + d + ", " + y;

  allReply = [...allReply, item.answers];
  return (
    <View
      style={{
        alignSelf: "baseline",
        paddingLeft: 20,
        paddingRight:10,
      }}
    >
      <View style={{ marginTop: 20, flexDirection: "row",marginRight:10 }}>
        <Image
          source={{ uri: item.profile_image }}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            marginRight: 10,
          }}
        />
        <View>
          <Text
            style={{
              marginLeft: 4,
              fontSize: 22,
              fontFamily: "MontserratMedium",
              color: COLORS.light,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              // backgroundColor: "red",
              paddingTop: 5,
              paddingLeft: 5,
            }}
          >
            {/* <HTMLView
              value={item.question.toString().substr(0, 50)}
              stylesheet={styles}
              addLineBreaks={true}
              paragraphBreak=""
            /> */}
            <HTMLView 
            value={item.question.toString()}
            stylesheet={styles}
              addLineBreaks={true}
              paragraphBreak=""
            />
            {/* <View>
              <Text>
                {item.question}
              </Text>
            </View> */}
    
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {dt}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon name="thumb-up" color="green" num={item.question_upvoted} />
            <Icon name="thumb-down" color="red" num={item.question_downvoted} />
            <Icon name="bell" color="tomato" num={item.question_notification} />
            <Icon name="message" color="green" />
            <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 30,
                    borderColor: 'tomato',
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 7,
                    marginRight: 10,
                  }}
                // onPress={() =>{
                 
                //     setQuesid(item.id);
                //     setTagid(item.tag_id);
                //     // postComment(quesid);
                // }}
                >
                  <MaterialCommunityIcons
                    name="flag"
                    size={25}
                    color={"tomato"}
                   // style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <CustomButton /> */}
      {/*<Text
        style={{
          fontSize: 27,
          fontFamily: "MontserratExtraLight",
          marginTop: 15,
          marginLeft: DIM.width * 0.16,
        }}
      >
        Answers{"\n"}
        .........................................
      </Text>
      {item.answers.length > 0 && (
        <View>
          {item.answers.map((reply, index) => {
            let year = reply.updated_at.substr(0, 4);
            let m = parseInt(reply.updated_at.substr(5, 7));
            let monthStr = months[m - 1];
            let date = reply.updated_at.substr(8, 2);
            let weekday = new Date(reply.updated_at.substr(0, 10)).getDay();
            let day = weekdayStr[weekday];
            let datetime = day + ", " + monthStr + " " + date + ", " + year;
            return (
              <AnswerComponent
                key={index}
                name={reply.name}
                answer={reply.answer}
                upvote={reply.answer_upvoted}
                downvote={reply.answer_downvoted}
                datetime={datetime}
                answeredby_user_id={reply.answeredby_user_id}
              />
            );
          })}
        </View>
      )}
      {
        <>
          <View
            style={{
              marginLeft: DIM.width * 0.05,
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{
                height: 70,
                width: 70,
                borderWidth: 3,
                borderRadius: 50,
                borderColor: COLORS.light,
                marginRight: 10,
              }}
            />
            <View
              style={{
                justifyContent: "center",
                width: 230,
                height: 60,
                borderRadius: 10,
                paddingLeft: 10,
                backgroundColor: COLORS.boxColor,
              }}
            >
              <TextInput
                placeholder={placeholderText}
                style={{
                  fontFamily: "MontserratRegular",
                  fontSize: 13,
                }}
              />
            </View>
            <TouchableOpacity style={{ marginLeft: 7 }} onPress={_pickDocument}>
              <Entypo name="attachment" size={25} color="slategrey" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 15,
              height: 50,
              width: 200,
              backgroundColor: COLORS.light,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "MontserratRegular",
              }}
            >
              Post
            </Text>
            </TouchableOpacity>
        </>
      }*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18,
    height: 150,
    width: DIM.width-30,
   //width:Dimensions.get('window').width-100
  },
});

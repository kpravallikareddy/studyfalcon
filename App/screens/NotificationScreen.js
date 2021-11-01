/** @format */

import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, DIM, SIZES, baseUrl } from "../../constants";

let response,
  json,
  categoryList,
  allQuestions = [];

export default function NotificationScreen({ navigation, route }) {
  const [count, setCount] = useState();
  const [not, setNot] = useState([]);

  const username = route.params.data.username;

  const userIdStr = route.params.data.userId;

  const getQuestions = async (id) => {
    let question = [];

    let response1 = await fetch(baseUrl + "/categories_list", {
      method: "GET",
    });
    let json1 = await response1.json();

    categoryList = json1.category_list;
    // console.log(categoryList);

    for (var i = 0; i < categoryList.length; i++) {
      let r = await fetch(baseUrl + "/category_view/" + categoryList[i].id, {
        method: "GET",
      });
      let j = await r.json();
      question.push(j.questions);
    }
    // console.log(question.length);

    for (var i = 0; i < question.length; i++) {
      let temp = question[i];
      // console.log(temp.length);

      let result = temp.filter((q) => q.id === id);
      if (result.length === 0 && i === question.length - 1) {
        navigation.navigate("NotifyDetails", { data: null });
      } else {
        let data = {
          question: result,
          username: username,
          userIdStr: userIdStr,
        };
        navigation.navigate("NotifyDetails", { data: data });
        break;
      }
    }
  };

  const getNotify = async () => {

    console.log('userid',userIdStr);

    response = await fetch(baseUrl + "/notification_list/" + userIdStr, {
      method: "GET",
    });
    json = await response.json();
    setCount(json.count);
    setNot(json.notifications);
  };

  useEffect(() => {
    getNotify();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={COLORS.light} style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{
            position: "absolute",
            // backgroundColor: "red",
            //height: 50,
            height:SIZES.header * 0.9,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            top: SIZES.header * 0.9 * 0.40,
            right: 10,
          }}
        >
          <MaterialCommunityIcons name="menu" size={35} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 30,
          width: DIM.width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "MontserratLight" }}>
          You have {count} notifications
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {not.map((item, index) => {
          return (
            <TouchableHighlight
              onPress={() => {
                if (item.ques_id !== null) getQuestions(item.ques_id);
              }}
              underlayColor={"white"}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
              }}
              key={index}
            >
              <View
                style={{
                  backgroundColor: COLORS.boxColor,
                  borderRadius: 10,
                  height: SIZES.header * 0.9,
                  paddingLeft: 20,
                  paddingTop: 5,
                }}
              >
                <View
                  style={{
                    height: "70%",
                    // backgroundColor: "red",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    {item.notification}
                  </Text>
                </View>
                <View
                  style={{
                    height: "30%",
                    // backgroundColor: "blue",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {item.seen === "0" && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "MontserratExtraBold",
                        marginLeft: "57%",
                        marginRight: 2,
                        marginBottom: 4,
                      }}
                    >
                      {"Not seen yet."}
                    </Text>
                  )}
                  {item.seen === "1" && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "MontserratExtraBold",
                        marginLeft: "75%",
                        marginRight: 10,
                      }}
                    >
                      {"seen"}
                    </Text>
                  )}
                  <MaterialCommunityIcons
                    name={item.seen === "0" ? "check" : "check-all"}
                    size={25}
                    color={COLORS.light}
                  />
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    //height: SIZES.header * 0.9,
    width: DIM.width,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "MontserratExtraBold",
    color: COLORS.white,
    marginTop: "13.5%",
  },
});

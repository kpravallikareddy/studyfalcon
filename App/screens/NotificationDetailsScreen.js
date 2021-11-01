import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, DIM, SIZES, baseUrl } from "../../constants";

import { QuesAns } from "../components";

function NotificationDetailsScreen({ navigation, route }) {
  const data = route.params.data.question;
  const [image, setImage] = useState();
  const userIdStr = route.params.data.userIdStr;

  const username = route.params.data.username;

  const getProfileImage = async () => {
    let myResponseForImage = await fetch(
      baseUrl + "/mentors_profile/" + userIdStr,
      {
        method: "GET",
      }
    );
    let json2 = await myResponseForImage.json();
    setImage(json2.Data.profile_image);
  };

  useEffect(() => {
    getProfileImage();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={COLORS.light} style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          top: SIZES.header * 0.9 * 0.43,
          left: 10,
        }}
      >
        <AntDesign name="left" size={30} color={COLORS.white} />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View>
          {data.map((item, index) => {
            return (
              <QuesAns
                key={index}
                item={item}
                image={image}
                username={username}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: SIZES.header * 0.9,
    width: DIM.width,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "MontserratExtraBold",
    color: COLORS.white,
    marginTop: "8.5%",
  },
});

export default NotificationDetailsScreen;

import React, { useState } from "react";

import { StyleSheet, View, Text, Image } from "react-native";
import { COLORS, DIM, baseUrl, baseUrlUpload } from "../../constants";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppTextInput, Buttons } from "../components";
//import AsyncStorage from '@react-native-async-storage/async-storage';

let data, msg, status;

function MentorsLogin({ navigation }) {
  //const appLogo = baseUrlUpload + "/logo.png";

  const appLogo = require("../../assets/AppLogo.png");
  const [res, setRes] = useState("");

  const [border, setBorder] = useState(COLORS.light);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [header, setHeader] = useState("Mentors Login");

  let formdata = new FormData();

  const sendData = async (email, pass) => {
    formdata.append("userId", email);
    formdata.append("userPass", pass);

    let link = baseUrl + "/login";

    let response = await fetch(link, {
      method: "POST",
      body: formdata,
    });
    let json = await response.json();
    let msg = json.msg;
    let status = json.status;
    let data = json.user_data;
    console.log('response',json)

    if (status === 1) {
      setRes("logged");
      setHeader("Success !");
      setBorder(COLORS.light);
      //   setTimeout(navigation.navigate("Drawer", { data: data }), 3000);
      //AsyncStorage.setItem('mentorloggedin','mentorloggedin')
      navigation.navigate("Drawer", { data: data });
    } else {
      setRes("notLogged");
      setBorder("red");
      setHeader("Failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          height: 140,
          width: 140,
          justifyContent: "center",
          alignItems: "center",
          borderColor: COLORS.light,
          borderWidth: 4,
          borderRadius: 70,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/AppLogo.png")}
          style={{
            height: 130,
            width: 130,
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          height: 50,
          width: DIM.width * 0.84,
          //   backgroundColor: "green",
          marginBottom: 20,
          borderRadius: 10,
          flexDirection: "row",
          borderWidth: 3,
          borderColor: border,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {res === "logged" && (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={40}
            color={COLORS.light}
            style={{ marginRight: 5 }}
          />
        )}
        {res === "notLogged" && (
          <Entypo
            name="circle-with-cross"
            style={{ marginRight: 5 }}
            size={30}
            color={"red"}
          />
        )}
        <Text
          style={{
            fontFamily: "MontserratRegular",
            color: res === "notLogged" ? "red" : COLORS.light,
            fontSize: 20,
          }}
        >
          {header}
        </Text>
      </View>
      <AppTextInput
        iconName="email"
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <AppTextInput
        iconName="lock"
        placeholder="Password"
        pass={1}
        onChangeText={(text) => setPass(text)}
      />
      <Buttons
        title="Login"
        style={{ marginBottom: 20 }}
        onPress={() => {
          sendData(email, pass);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MentorsLogin;

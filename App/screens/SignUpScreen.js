/** @format */

import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  StatusBar as sb,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS, SIZES, DIM, baseUrl } from "../../constants";
import { AppTextInput, Buttons } from "../components";

let data, msg;

export default function SignUpScreen({navigation}) {

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCpass] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const headerPart = {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  };

  let formData = new FormData();

  
  



  const postData = async (email, pass, cpass, name, address, phone) => {
    
    if(email == ''){
      Alert.alert('This field is required')
    } else if(pass == ''){
      Alert.alert('This field is required')
    }
    else if(cpass == ''){
      Alert.alert('This field is required')
    }
    else if(name == ''){
      Alert.alert('This field is required')
    }
    else if(address == ''){
      Alert.alert('This field is required')
    }
    else if(phone == ''){
      Alert.alert('This field is required')
    }
    else {

    formData.append("email", email);
    formData.append("password", pass);
    formData.append("cpassword", cpass);
    formData.append("user_type_id", 2);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);

    //console.log('formdata',formData);

    let response = await fetch(baseUrl + "/register", {
      method: "POST",
      body: formData,
    });


    let json = await response.json();
    console.log('response',json);
    let status = json.status;
    let data = json;
    let msg = json.msg;
    // if (data === 1) {
    //   navigation.navigate("Drawer", { data: data });
    // } else {
    //   Alert.alert("Study Falcon", msg);
    // }

    if (status === 1) {
      navigation.navigate("Drawer", { data: data });
    } else {
      Alert.alert("Study Falcon", msg);
    }
    }
  };
  useEffect(() => {
   // postData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={COLORS.light} style="light" />
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontFamily: "MontserratExtraBold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Please login to read "NCERT{"\n"} Science class IX"
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: COLORS.black,
          fontFamily: "MontserratMedium",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Be a part of the study falcon community!
      </Text>
      <AppTextInput
        placeholder="First Name"
        onChangeText={(text) => setName(text)}
      />
      <AppTextInput placeholder="Last Name" />
      <AppTextInput
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <AppTextInput
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
      />
      <AppTextInput
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
      />
      <AppTextInput
        placeholder="Enter password"
        pass={1}
        iconName="lock"
        onChangeText={(text) => setPass(text)}
      />
      <AppTextInput
        placeholder="Re-Enter password"
        pass={1}
        iconName="lock"
        onChangeText={(text) => setCpass(text)}
      />
      <Buttons
        title="Register"
        style={{ marginBottom: 20 }}
        onPress={() => {
          postData(email, pass, cpass, name, address, phone);
         // Alert.alert("Study Falcon", "Registration success..");
        }}
      />
      <Text
        style={{
          fontSize: 19,
          textAlign: "center",
          fontFamily: "MontserratRegular",
          marginTop: 20,
          color: "grey",
        }}
      >
        Login here to be a new member of the community.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: COLORS.white,
    // justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
});

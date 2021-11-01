/** @format */

import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";

import { COLORS, baseUrl, config_android, config_ios } from "../../constants";
import { AppTextInput, Buttons } from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

let msg, status, data;

export default function LoginScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [googleSubmitted, setGoogleSubmitted] = useState(false);
  const [userloggedin, setUserloggedin] =useState()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    AsyncStorage.getItem('userloggedin').then((userloggedin) => {
      if(userloggedin){
         setUserloggedin('userloggedin')
       //  navigation.navigate("Drawer");
      }
     // console.log('userid',this.state.userid);
  });

  console.log('userloggedin----',userloggedin);

  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
 
  }, []);
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 5000,

    useNativeDriver: true,
  }).start();

  let formdata = new FormData();

  const sendData = async (email, pass) => {
    formdata.append("userId", email);
    formdata.append("userPass", pass);
    formdata.append("fcm_token", expoPushToken);
    let link = baseUrl + "/login";

    let response = await fetch(link, {
      method: "POST",
      body: formdata,
    });
    let json = await response.json();
    msg = json.msg;
    status = json.status;
    data = json.user_data;
    if (status === 1) {
      AsyncStorage.setItem('userloginid',data.userId)
      AsyncStorage.setItem('userloggedin','userloggedin')
      navigation.navigate("Drawer", { data: data });
    } else {
      Alert.alert("Study Falcon", msg);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      setExpoPushToken(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const handleGoogleSignIn = () => {
    setGoogleSubmitted(true);
    const config = {
      iosClientId: config_ios,
      androidClientId: config_android,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type === "success") {
          Alert.alert("StudyFalcon", "Success !");
          navigation.navigate("Drawer", { data: data });
        } else {
          alert("Google signin was cancelled.");
        }
        setGoogleSubmitted(false);
      })
      .catch((error) => {
        console.log("The error message is", error);
        setGoogleSubmitted(false);
      });
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        style={styles.container}
        behavior={Platform.OS == "android" ? "height" : "padding"}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text
            style={{
              fontSize: 22,
              color: COLORS.light,
              fontFamily: "MontserratExtraBold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Please login to read "NCERT Science {"\n"}class IX"
          </Text>
        </Animated.View>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontFamily: "MontserratMedium",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Be a part of the study falcon community!
        </Text>
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
        <View>
          <Buttons
            title="Login"
            style={{ marginBottom: 20 }}
            onPress={() => {
              sendData(email, pass);
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "MontserratRegular",
                  color: COLORS.black,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              {"  "} Or,{"  "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.black,
                  fontFamily: "MontserratMedium",
                }}
              >
                Sign-Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {!googleSubmitted && (
            <Buttons
              onPress={handleGoogleSignIn}
              title="Login with Google"
              style={{ width: "40%", marginRight: 20 }}
            />
          )}
          {googleSubmitted && (
            <View style={styles.buttonContainer}>
              <ActivityIndicator size="large" color={"white"} />
            </View>
          )}
          <Buttons
            title="Mentors login"
            style={{ width: "40%" }}
            onPress={() => {
              navigation.navigate("Mentor");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height: 65,
    width: "40%",
    backgroundColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 20,
  },
});

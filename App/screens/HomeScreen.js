/** @format */

import React, { useState, useEffect,useRef } from "react";

import { StatusBar } from "expo-status-bar";

import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryGroup,
} from "victory-native";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { DIM, SIZES, COLORS, baseUrl } from "../../constants";
import { AppTextInput, HomeComponent, SearchQuesAns } from "../components";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

let str = "Search by categories";

let response, json, response1, json1, txt;

export default function HomeScreen({ navigation, route, textBelow }) {
  let validity = true;

  const [image, setImage] = useState();

  const [searched, setSearched] = useState();
  const [show, setShow] = useState(false);
  const [questionArr, setQuestionArr] = useState([]);

  const [myQues, setMyQues] = useState([]);

  const userIdStr = route.params.data.userId;
  const username = route.params.data.username;
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  

  const getQues = async (cat) => {
    response = await fetch(baseUrl + "/searchlist/" + cat, {
      method: "GET",
    });
    json = await response.json();
    if (json.categories.length === 0) {
      validity = false;
    }
    let temp = json.questions;

    setQuestionArr(temp);
  };

  const getMyQues = async () => {
    response1 = await fetch(baseUrl + "/myactivities/"+userIdStr, {
      method: "GET",
    });
    json1 = await response1.json();
    //console.log('myquestions',json1)
    setMyQues(json1.questions);
  };

  const getMyQues1 = async () => {
    response1 = await fetch(baseUrl + "/ansques/" +userIdStr, {
      method: "GET",
    });
    
    json1 = await response1.json();
    //console.log('response',json1);
    //setMyQues(json1.quesans);
  };


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
    console.log('userid',userIdStr);

    getMyQues();
    getMyQues1();
    getProfileImage();

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

  return (
    <>
      <View>
        <StatusBar backgroundColor={COLORS.light} style="light" />
       
        <View style={styles.header}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{
          position: "absolute",
         // height: 50,
          //height:SIZES.header * 0.9,
         // width: 50,
          //justifyContent: "center",
         // alignItems: "center",
          top: SIZES.header * 0.9 * 0.7,
          right: 10,
        }}
      >
        <MaterialCommunityIcons name="menu" size={35} color={COLORS.white} />
      </TouchableOpacity>
        </View>
        </View>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: DIM.height * 0.04 }}
      >
         <View>
          {/*<VictoryChart
            theme={VictoryTheme.material}
            domain={{ y: [-1.0, 1.0] }}
          >
            <VictoryGroup
              data={[
                { x: "Total questions\n asked", y: 1 },
                { x: "Total \nanswers", y: 0.5 },
                { x: "Total \nUpvotes", y: 1 },
                { x: "Total \nDownvotes", y: -1 },
              ]}
            >
              <VictoryLine
                interpolation="natural"
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                style={{
                  data: {
                    stroke: COLORS.light,
                    strokeOpacity: 0.6,
                  },
                  parent: { border: "1px solid #ccc" },
                }}
              />
            </VictoryGroup>
          </VictoryChart> */}
          <View
            style={{
              flexDirection: "row",marginTop:15,
            }}
          >
            <AppTextInput
              onChangeText={(text) => setSearched(text)}
              placeholder={str}
              style={{
                width: DIM.width * 0.75,
                marginLeft: 20,
                alignSelf: "center",
              }}
            />
            <TouchableOpacity
              onPress={() => {
                txt = searched;
                getQues(txt.toLowerCase());
                if (validity === false) {
                  Alert.alert(
                    "Study Falcon",
                    "Please Enter a valid category !"
                  );
                } else {
                  setShow(true);
                }
              }}
              style={{
                backgroundColor: COLORS.light,
                justifyContent: "center",
                alignItems: "center",
                height: 45,
                width: 50,
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <AntDesign name="search1" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View>
            {show && (
              <Text
                style={{
                  fontSize: 22,
                  marginLeft: 20,
                  fontFamily: "MontserratRegular",
                  color: COLORS.light,
                }}
              >
                Search result for "{txt}"
              </Text>
            )}
            {show && (
              <View style={{ marginBottom: 10, marginLeft: 20 }}>
                {questionArr.map((item, index) => {
                  return (
                    <SearchQuesAns
                      key={index}
                      item={item}
                      askedby_user_id={item.askedby_user_id}
                      username={username}
                      
                    />
                  );
                })}
              </View>
            )}
          </View>
          <HomeComponent
            text="My posts"
           // onPress={() => navigation.navigate("Post")}
          />
           <View
                style={{
                    flexDirection: "row",
                    marginTop: -10,
                    justifyContent: "center",
                    marginBottom: 10,
                }}>
          {textBelow !== null && (
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
                        <TouchableOpacity 
                        //onPress={onPress}
                        onPress={() => navigation.navigate("Post")}
                        >
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
                )}
              </View>
          <View style={{ marginBottom: 25 }}>
            {myQues.map((item, index) => {
              return (
                <SearchQuesAns
                  key={index}
                  item={item}
                  image={image}
                  askedby_user_id={null}
                  username={username}
                  loginid={userIdStr}
                />
              );
            })}
          </View>
          <HomeComponent
            textBelow={1}
            text="My answers"
           // onPress={() => navigation.navigate("Post")}
          />
          <HomeComponent
            textBelow={1}
            text="My upvotes"
           // onPress={() => navigation.navigate("Post")}
          />
          <HomeComponent
            textBelow={1}
            text="My downvotes"
           // onPress={() => navigation.navigate("Post")}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
   // height: SIZES.header * 0.9,
   //height:50,
    width: DIM.width,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    //alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "MontserratExtraBold",
    color: COLORS.white,
    marginTop: "13.5%",
  },
});

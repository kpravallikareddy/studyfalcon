/** @format */

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, } from "react-native";

import HTMLView from "react-native-htmlview";

import {
  COLORS,
  months,
  weekdayStr,
  baseUrlUpload,
  baseUrl,
  DIM,
} from "../../constants";

import {
  Buttons,
  PickerItemComponent,
  SpecialPIcker,
} from "../components";

import CustomButton from "../components/CustomButton";
import Icon from "../components/Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SearchQuesAns({
  item,
  image = null,
  askedby_user_id,
  username,
  loginid,
}) {
  //This shows the question creation time... just below, the name...

  let y = item.created_at.substr(0, 4);
  let m = parseInt(item.created_at.substr(5, 7));
  let mS = months[m - 1];
  let d = item.created_at.substr(8, 2);
  let wd = new Date(item.created_at.substr(0, 10)).getDay();
  let dateAc = weekdayStr[wd];
  let dt = dateAc + ", " + mS + " " + d + ", " + y;

  const [idName, setIdName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [like, setLike] = useState(0);
  const [show, setShow] = useState(false);
  const [tagid, setTagid] = useState();
  const [quesid, setQuesid] = useState();
  const [notification, setNotification] = useState(0);
  const [comment, setComment] = useState();
  const [userloginid, setUserLoginid] = useState();


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userloginid')
      if (value !== null) {
        console.log('userloginid', value)
        // value previously stored
      }
    } catch (e) {
      console.log(e)
      // error reading value
    }
  }

  useEffect(() => {
    //console.log('username',username);
    //console.log('loginid1',loginid);
    //getData();
    // setUserLoginid(loginid);
    //console.log('loginid',userloginid);
  }, []);

  //const userIdStr = route.params.data.userId;

  if (askedby_user_id !== null) {
    //getData();
    const getName = async () => {
      let response1 = await fetch(
        baseUrl + "/mentors_profile/" + askedby_user_id,
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

  const postLikes = async (id) => {
    console.log('like pressed');
    let response1 = await fetch(
      baseUrl + "ques_ans_feedback/ques/" + id + '/' + like,
      {
        method: "GET",
      }
    );
    let json1 = await response1.json();
    // console.log('likes response',json1)
    //setIdName(json1.Data.name);
    //setProfileImage(json1.Data.profile_image);
  };


  const postComment = async () => {
    console.log('post pressed');
    console.log('quesid', quesid);
    console.log('loginid', loginid);
    console.log('userid', tagid);
    console.log('comment', comment);

    let formdata = new FormData();

    formdata.append("question_id", quesid);
    formdata.append("answer", comment);
    formdata.append("userid", tagid);
    formdata.append("login_id", loginid);
    let response1 = await fetch(
      baseUrl + "/answer_post",
      {
        method: "POST",
        body: formdata,
      }
    );
    let json1 = await response1.json();
    //console.log('likes response',json1)
    alert(json1.msg);
    setShow(false);
  };





  return (
    <View
      style={{
        // alignSelf: "baseline",
        // paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        paddingBottom: 10
      }}
    >
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <View
          style={{
            height: 70,
            width: 70,
            justifyContent: "center",
            alignItems: "center",
            borderColor: COLORS.light,
            borderWidth: 2,
            borderRadius: 35,
          }}
        >
          <Image
            source={image != null ? { uri: image } : { uri: profileImage }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 8,
              fontSize: 18,
              fontFamily: "MontserratMedium",
              color: COLORS.light,
            }}
          >
            {askedby_user_id === null ? username : idName}
          </Text>
          <View
            style={{
              paddingTop: 5,
              paddingLeft: 5,
              paddingRight: 5
            }}
          >
            <HTMLView
              // value={item.question}
              // stylesheet={styles}
              // paragraphBreak=""
              value={item.question.toString()}
              stylesheet={styles}
              addLineBreaks={true}
              paragraphBreak=""
            />
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 14,
                marginBottom: 15,

              }}
            >
              {dt}
            </Text>
          </View>
          <View style={{ flexDirection: "row",justifyContent:'space-between', marginLeft:-50}}>
             {/* <View style={{flexDirection:'row'}}> justifyContent:'space-between', marginLeft:-50 */}
            <Icon name="thumb-up" color="green" num={10} id={item.id} value={1} />
            {/* <View 
            style={{padding:3, borderRadius:15,borderWidth:1,borderColor:COLORS.light,alignItems:'center',justifyContent:'center',position:'absolute',left:25,top:-8}}
            >
              <Text>
                155
              </Text>
            </View> 
            </View>*/}

            <Icon name="thumb-down" color="red" num={2} id={item.id} value={0} />

            {/* <Icon name="bell" color="tomato" num={item.question_notification} /> */}
            <Text>10</Text>
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
            //     postComment(quesid);
            // }}
            >
              <MaterialCommunityIcons name='bell' size={25} color='tomato' />
            </TouchableOpacity>
            <Text>10</Text>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                borderColor: 'green',
                borderWidth: 2,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 7,
                marginRight: 10,
              }}
              onPress={() => {
                setQuesid(item.id);
                setTagid(item.tag_id);
                setShow(true);
              }}
            >
              <MaterialCommunityIcons name='message' size={25} color='green' />
              {/* <Icon name="message" color="green" /> */}
            </TouchableOpacity>
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
          {show && (
            <View>
              {/* <View
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 25,
                  paddingBottom: 5,
                  marginTop: 10,
                  marginLeft: -80,
                  height: DIM.height * 0.15,
                  // backgroundColor: "red",
                  width: DIM.width - 50,
                }} 
              >*/}
              <View style={{ flexDirection: 'row', }}>
                <View
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 25,
                    paddingBottom: 5,
                    marginTop: 0,
                    marginLeft: -70,
                    height: 80,
                    // backgroundColor: "red",
                    width: DIM.width - 80,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      height: "100%",
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 20,
                      borderRadius: 15,
                      borderColor: COLORS.light,
                      borderWidth: 3,
                    }}
                  >
                    <TextInput
                      placeholder="Enter your text here..."
                      multiline
                      onChangeText={(text) => setComment(text)}
                      numberOfLines={10}
                      style={{
                        fontSize: 14,
                        fontStyle: "italic",
                        flex: 1,
                        paddingRight: 35,
                      }}
                    />
                    <TouchableOpacity
                      // style={{height:50,width:50,borderRadius:10,borderColor:COLORS.light,borderWidth:3,alignItems:'center',justifyContent:'center',marginTop:25}}
                      style={{ position: 'absolute', right: 10, top: 10 }}
                      onPress={() => {
                        postComment();
                      }}
                    >
                      <MaterialCommunityIcons
                        name="send"
                        size={20}
                        color={COLORS.light}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                </View>

                {/*<Buttons
                  style={{
                    alignSelf: "center",
                    width: DIM.width * 0.3,
                    marginTop: 25,
                  }}
                  title="Post Now"
                  onPress={() => {
                    // if (
                    //   selectedValType.length !== 0 &&
                    //   selectedValueCat !== "Select Categories" &&
                    //   subselected !== "Select Sub-Category"
                    // ) {
                    postComment();
                    //Alert.alert("Study Falcon", "your question posted..");
                    //navigation.goBack();
                    // } else {
                    //   Alert.alert("Study Falcon", "Please fill all the fields");
                    // }
                  }}
                />*/}
              </View>
          )}

            </View>
      </View>
        {/* <CustomButton style={{ alignSelf: "center" }} /> */}
      </View>
      );
}

      const styles = StyleSheet.create({
        container: {
        marginLeft: 8,
      lineHeight: 24,
      fontWeight: "700",
      fontSize: 20,
  },
});

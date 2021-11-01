/** @format */

import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { StackActions } from "@react-navigation/native";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import {
  Buttons,
  PickerItemComponent,
  SpecialPIcker,
  AppTextInput,
} from "../components";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { BecomeMentorScreen, NotificationScreen, OurMentors } from ".";
import { COLORS, DIM, SIZES, baseUrl } from "../../constants";

import RadioButtonRN from 'radio-buttons-react-native';
import RadioButton from 'expo-radio-button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MentorProfile ({ navigation, route }) {
   // console.log('route params -----',route)
    const [imageUri, setImageUri] = useState();
    const [photo, setPhoto] = useState();
    // let dob, gender, qual, exp, expertise;
  
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [qual, setQual] = useState('');
    const [exp, setExp] = useState('');
    const [expertise, setExpertise] = useState('');
    const [progress, setProgress] = useState();
    const [textEdit, setTextEdit] = useState(false);
    const [filename, setFilename] = useState();
    const [dtvisible, setDtVisible] = useState(false);
    const [date, setDate] = useState();
    const [visible, setVisible] = useState(false);
    const [myDate, setMyDate] = useState("");
    //const [current, setCurrent] = useState("option 1")
  
    const data = [
      {
        label: 'Male',
        accessibilityLabel: 'male'
      },
      {
        label: 'Female',
        accessibilityLabel: 'female'
      }
    ];
  
    const userIdStr = route.params.userId;
  
    // const updateprofile = async () => {
  
    //   // console.log('userid----',userIdStr)
    //   let formdata = new FormData();
  
    //   formdata.append("name", route.params.data.username);
    //   formdata.append("gender", gender);
    //   formdata.append("dob", dob);
    //   formdata.append("qualification", qual);
    //   formdata.append("experience", exp);
    //   formdata.append("expertise", expertise);
    //   formdata.append("profile_image", { uri: imageUri, type: 'image/jpg', name: "image.jpg" });
  
    //   response = await fetch(baseUrl + "/update_profile/" + userIdStr, {
  
    //     method: "POST",
    //     body: formdata,
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   });
  
    //   console.log('formdata -------', formdata);
    //   json = await response.text();
    //   console.log('response', json)
    //   //alert(json.msg)
    //   setTextEdit(false);
    // }
  
    const getMentorProfile = async () => {
     let response = await fetch(baseUrl + "/mentors_profile/" + userIdStr, {
        method: "GET",
      });
      let json = await response.json();
       console.log('response', json);
      // console.log('response', json.Data.profile_image);
      setDob(json.Data.dob);
      setGender(json.Data.gender);
      setQual(json.Data.qualification);
      setExp(json.Data.experience);
      setExpertise(json.Data.expertise);
      setImageUri(json.Data.profile_image);
  
      // console.log('dob', dob);
      // console.log('gender', gender);
      // console.log('qualigi', qual);
      // console.log('exp', exp);
      // console.log('expertise', expertise);
      // console.log('image', imageUri);
    };
  
    const calculateProgress = () => {
      if (dob != null && gender != null && qual != null && exp != null && expertise != null && imageUri != null) {
        setProgress(100)
      }
      else if (dob != null && gender != null && qual != null && exp != null && expertise != null) {
        setProgress(87.5)
      }
      else if (dob != null && gender != null && qual != null && exp != null) {
        setProgress(75)
      }
      else if (dob != null && gender != null && qual != null) {
        setProgress(62.5)
      }
      else if (dob != null && gender != null) {
        setProgress(50)
      }
      else if (dob != null) {
        setProgress(37.5)
      }
      else {
        setProgress(25)
      }
    }
  
    useEffect(() => {
      getMentorProfile();
     // calculateProgress();
  
    }, []);
  
    const requestPermission = async () => {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        alert("You need to enable permissions for camera.");
      }
    };
  
    const selectImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync();
      console.log('result', result)
      if (!result.cancelled) {
        await setImageUri(result.uri);
        setPhoto(result);
  
        // console.log('result--',photo.uri, photo.type)
  
        console.log('imageuri:----', photo);
        const split = photo.uri.split('/')
        const file = split[split.length - 1]
        setFilename(file);
        // console.log('filename--',split[split.length - 1])       //photo.uri.split(".")[1])
        setTimeout(() => {
          updateprofile();
        }, 2000);
  
        setTimeout(() => {
          getMentorProfile();
        }, 4000);
  
      }
    };
  
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
  
    useEffect(() => {
      // console.log('progress', progress);
  
      return () => {
        requestPermission();
      };
    }, []);
  
    return (
      <>
        <View>
          <StatusBar backgroundColor={COLORS.light} style="light" />
          <View style={styles.header}>
            <Text style={styles.headerText}>Mentorprofile</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              position: "absolute",
              //height: 50,
              height: SIZES.header * 0.9,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              top: SIZES.header * 0.9 * 0.35,
              right: 10,
            }}
          >
            <MaterialCommunityIcons name="menu" size={35} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: DIM.height * 0.05 }}
        >
          {/*<View style={{ marginTop: 20, marginLeft: 15 }}>
            <ProgressBarAnimated
              width={barWidth}
              value={progress}
              backgroundColor='#058D8B'
            //backgroundColorOnComplete="#058D8B"   
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#058D8B' }}>
              {progress}%
            </Text>
          </View>*/}
          <View
            style={{
              flex: 1,
              padding: 10,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "MontserratExtraBold",
                  marginLeft: SIZES.normal,
                  marginBottom: SIZES.normal * 2,
                  marginTop:10,
                }}
              >
                Technical
              </Text>
  
              {/* <TouchableOpacity
                style={{ alignItems: 'flex-end', margin: 10, marginTop: 0 }}
                onPress={() => setTextEdit(true)}
              >
                {!textEdit &&
                <Text style={{ fontSize: 20, fontFamily: 'MontserratExtraBold', }}>
                  Edit
                </Text>
                }
                {textEdit &&
               
                <Text style={{ fontSize: 20, fontFamily: 'MontserratExtraBold', padding:5,borderWidth:1,borderColor:'#000000',borderRadius:10 }}>
                Edit
                </Text>
                
                }
              </TouchableOpacity> */}
            </View>
  
            <View
              style={{
                height: DIM.height * 0.4,
                width: DIM.width,
              }}
            >
              <View style={styles.titleContainer}>
                <View style={styles.imageContainer}>
                  {!imageUri && (
                    <Image
                      resizeMode="cover"
                      source={require("../../assets/user.png")}
                      style={styles.imageStyle}
                    />
                  )}
                  {imageUri && (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.imageStyle}
                      resizeMode="cover"
                    />
                  )}
                  {/*<TouchableOpacity
                    onPress={selectImage}
                    style={{
                      backgroundColor: COLORS.white,
                      height: 45,
                      width: 45,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      ...styles.iconContainer,
                    }}
                  >
                    <Entypo name="camera" size={35} color={COLORS.light} />
                  </TouchableOpacity>*/}
                </View>
              </View>
            </View>
           {/* <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 60,
                  width: 140,
                  backgroundColor: COLORS.light,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                 <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "MontserratMedium",
                    color: COLORS.white,
                  }}
                >
                  Hello
                </Text> 
              </View>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: "center",
                  marginLeft: DIM.width * 0.17,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "MontserratRegular",
                    color: COLORS.black,
                  }}
                >
                  I'm
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {route.params.data.username}
                </Text>
              </View>
            </View>*/}
            <View
                style={{
                  backgroundColor: COLORS.white,
                  width: DIM.width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                  paddingRight: 20,
                }}
              >
                {/* <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "MontserratRegular",
                    color: COLORS.black,
                  }}
                >
                  I'm
                </Text> */}
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginRight: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "MontserratMedium",
                      //flex: 1,
                    }}
                  >
                    Name
                  </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {route.params.username}
                </Text>
                </View>
              </View>
            <View pointerEvents={textEdit ? "auto" : "none"}>
              <View
                style={{
                  //marginTop: 10,
                  backgroundColor: COLORS.boxColor,
                  //width: DIM.width,
                  width: Dimensions.get('screen').width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                  paddingRight: 20,
  
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginRight: 0, }}>
                  <Text
                    style={{
                      //flex: 1,
                      fontSize: 18,
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    DOB
                  </Text>
  
                  {/* <TextInput
                  placeholder="mm/dd/yyyy"
                  //placeholder={myDate === "" ? " mm/dd/yyyy" : myDate}
                  style={{fontSize:18,fontFamily: "MontserratMedium",width:Dimensions.get('window').width/3}}
                  onChangeText={(text) => setDob(text)}
                  value={dob}
                  /> */}
                  {dob?
                  <View style={{marginRight:18}}>
                    <Text style={{fontSize: 18,
                      fontFamily: "MontserratMedium",}}>
                      {dob}
                    </Text>
                  </View>
                  :
                  <View>
                    <Text style={{fontSize: 18,
                      fontFamily: "MontserratMedium",}}>
                      yyyy/mm/dd
                    </Text>
                  </View>
                  }
                  <DateTimePickerModal
                    isVisible={dtvisible}
                    mode="date"
                    onCancel={() => setVisible(!dtvisible)}
                    onConfirm={(date) => {console.log('date --',date)
                      let month = date.getUTCMonth() + 1;
                      let d = date.getUTCDate();
                      let year = date.getFullYear();
                      setMyDate(month + "/" + d + "/" + year);
                      setDate(date);
                      setDob(date.toISOString().slice(0,10));
                    }}
                  />
                  {textEdit &&
                  <TouchableOpacity 
                  onPress={() => setDtVisible(true)}>
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={30}
                      color='black'
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  }
                  {/* <TextInput
                    placeholder='Type here..'
                    value={dob}
                    // caretHidden={false}
                    // autoFocus={textEdit}
                    style={{
                      //flex:1,
                      alignSelf: 'flex-end',
                      //justifyContent:'space-between',
                      //textAlignVertical: 'top',
                      fontSize: 18,
                      // marginLeft:-10,
                      fontFamily: "MontserratRegular",
  
                    }}
                    onChangeText={(text) => setDob(text)}
                  /> */}
                  {/* <Text
                  style={{
                    fontSize: 18,
                    marginRight: 20,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {dob}
                </Text> */}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: DIM.width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                  paddingRight: 20,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginRight: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "MontserratMedium",
                      //flex: 1,
                    }}
                  >
                    Gender
                  </Text>
                  <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "MontserratRegular",
                    
                  }}
                >
                  {gender}
                </Text>
                  {/* <TextInput
                  placeholder='Type here..'
                  value={gender}
                  style={{
                    fontSize: 18,
                    // marginLeft:-10,
                    fontFamily: "MontserratRegular",
  
                  }}
                  onChangeText={(text) => setGender(text)}
                /> */}
  
                  {/*<RadioButton value="male"
                    containerStyle={{ marginBottom: 10 }}
                    selected={gender}
                    onSelected={(value) => setGender(value)}
                    radioBackground="green" >
                    <Text>Male</Text>
                  </RadioButton>
                  <RadioButton
                    value="female"
                    selected={gender}
                    onSelected={(value) => setGender(value)}
                    radioBackground="green" >
                    <Text>Female</Text>
              </RadioButton>*/}
  
                  {/* <Text
                  style={{
                    fontFamily: "MontserratRegular",
                    fontSize: 18,
                    marginLeft: DIM.width * 0.45,
                    marginRight: 20,
                  }}
                >
                  {gender}
                </Text> */}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.boxColor,
                  width: DIM.width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                  paddingRight: 20,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    Qualification
                  </Text>
                  <TextInput
                    placeholder='Type here..'
                    value={qual}
                    style={{
                      fontSize: 18,
                       marginRight:-28,
                      fontFamily: "MontserratRegular",
  
                    }}
                    onChangeText={(text) => setQual(text)}
                  />
                  {/* <Text
                  style={{
                    fontSize: 18,
                    marginRight: 20,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {qual}
                </Text> */}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: DIM.width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                  paddingRight: 20,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      //flex: 1,
                      fontSize: 18,
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    Work Experience
                  </Text>
                  <TextInput
                    placeholder='Type here..'
                    value={exp}
                    style={{
                      fontSize: 18,
                      // marginLeft:-10,
                      marginRight:-47,
                      fontFamily: "MontserratRegular",
  
                    }}
                    onChangeText={(text) => setExp(text)}
                  />
                  {/* <Text
                  style={{
                    fontSize: 18,
                    marginRight: 20,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {exp}
                </Text> */}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.boxColor,
                  width: DIM.width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                  paddingRight: 20,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      //flex: 1,
                      fontSize: 18,
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    Discipline of Expertise
                  </Text>
                  <TextInput
                    placeholder='Type here..'
                    value={expertise}
                    style={{
                      fontSize: 18,
                      // marginLeft:-10,
                      marginRight:-10,
                      fontFamily: "MontserratRegular",
  
                    }}
                    onChangeText={(text) => setExpertise(text)}
                  />
                  {/* <Text
                  style={{
                    fontSize: 18,
                    marginRight: 20,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {expertise}
                </Text> */}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: DIM.width,
                  height: 60,
                  justifyContent: "center",
                  paddingLeft: SIZES.normal * 2,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      flex: 1,
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    Email-ID
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginRight: 20,
                      fontFamily: "MontserratRegular",
                    }}
                  >
                    {route.params.userName}
                  </Text>
                </View>
              </View>
            </View>
            {/* {textEdit && (
              <Buttons
                style={{
                  alignSelf: "center",
                  width: DIM.width * 0.3,
                  marginTop: 25,
                }}
                title="Done"
                onPress={() => {
                  // if (
                  //   selectedValType.length !== 0 &&
                  //   selectedValueCat !== "Select Categories" &&
                  //   subselected !== "Select Sub-Category"
                  // ) {
                  updateprofile();
                  //Alert.alert("Study Falcon", "your question posted..");
                  //navigation.goBack();
                  // } else {
                  //   Alert.alert("Study Falcon", "Please fill all the fields");
                  // }
                }}
              />
            )} */}
          </View>
        </ScrollView>
      </>
    );
  };

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
    titleContainer: {
      marginTop: SIZES.normal,
      height: DIM.height * 0.33,
      width: DIM.width,
      // backgroundColor: COLORS.boxColor,
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      //height: DIM.height * 0.33,
      // width: DIM.height * 0.33,
      height: DIM.height * 0.33,
      width: DIM.height * 0.33,
      borderRadius: 100,
      // borderBottomRightRadius: 40,
      // backgroundColor: COLORS.light,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    imageStyle: {
      height: DIM.height * 0.33,
      width: DIM.height * 0.33,
      borderRadius: 150,
    },
    iconContainer: {
      position: "absolute",
      bottom: SIZES.normal * 2,
      right: SIZES.normal * 2,
    },
  });
  
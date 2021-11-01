/** @format */
import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import {
  AppTextInput,
  Buttons,
  CustomButton,
  MentorItem,
  QuesAns,
  SearchQuesAns,
} from "../components";
import { COLORS, DIM, SIZES, baseUrl, baseUrlUpload } from "../../constants";

import { connect, useStore, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

let str = "Search by categories";

let response, json, txt;

export default function OurMentors({ route }) {
  let validity = true;
  const userimage = '/assets/person_image.jpg';
  const username = route.params.data.username;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useStore();

  const [questionArr, setQuestionArr] = useState([]);

  const [stringData, setStringData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [dataDetails, setDataDetails] = useState([]);

  const [show, setShow] = useState(false);

  const getSearchQues = async (cat) => {
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

  

  const getMentor = async () => {
    response = await fetch(baseUrlUpload, {
      method: "GET",
    });
    json = await response.text();
    let regex = /[a-zA-Z0-9_-]+[\.](jpg|png|jpeg)/gm;
    let arr = json.match(regex);

    setStringData(arr);
  };

  const getMentorDetails = async () => {
    let response = await fetch(baseUrl + "/all_mentor", {
      method: "GET",
    });
    let json = await response.json();
    console.log('response',json)
    setDataDetails(json.data);
  };

  useEffect(() => {
    getMentorDetails();
  }, []);

  useEffect(() => {
    getMentor();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Text style={styles.headerText}>Our Mentors</Text>
     
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{
          position: "absolute",
          // backgroundColor: "red",
          //height: 50,
         // height: SIZES.header * 0.9,
          //width: 50,
         // justifyContent: "center",
         // alignItems: "center",
          top: SIZES.header * 0.9 * 0.65,
          right: 10,
        }}
      >
        <MaterialCommunityIcons name="menu" size={35} color={COLORS.white} />
      </TouchableOpacity>
      </View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: DIM.height * 0.2 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "MontserratExtraBold",
              color: COLORS.pink,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            MENTORING
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 22,
              fontFamily: "MontserratRegular",
              color: COLORS.lightBlack,
            }}
          >
            Is a brain to pick, {"\n"}An Ear To Listen,{"\n"}And A Push To Right
            Direction.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            // backgroundColor: "red",
          }}
        >
          <AppTextInput
            onChangeText={(text) => setSearched(text)}
            placeholder={str}
            style={{
              width: DIM.width * 0.75,
              marginLeft: 20,
              alignSelf: "center",
              borderWidth: 3,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              txt = searched;
              getSearchQues(txt.toLowerCase());
              if (validity === false) {
                Alert.alert("Study Falcon", "Enter a valid category !");
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
        <View style={{ alignSelf: "baseline", paddingLeft: 23 }}>
          <Text
            style={{
              fontSize: 22,
              marginBottom: 20,
              fontFamily: "MontserratExtraBold",
              color: "black",
            }}
          >
            Our mentors
          </Text>
        </View>
        {/* <View>
          {dataDetails.map((i, index) => {
            let myImage = i.profile_image;
            let myImage1 = i.profile_image;
            if (myImage === baseUrlUpload) {
              if (index % 2 === 0) {
                myImage = i.profile_image + "anjali.jpg";
                myImage1 = i.profile_image + "govind.jpg";
              } else {
                myImage = i.profile_image + "images6.jpg";
                myImage1 = i.profile_image + "anjali.jpg";
                name1 = [index+1].name;
              }
            }
            if (index >= 0 && index <= 10) {
              return (
                <MentorItem
                  key={index}
                  image1={myImage}
                  image2={myImage1}
                  name={i.name}
                  //name1={name1}
                  //name1={dataDetails[index + 1].name}
                  exp={i.expertise}
                 // exp1={dataDetails[index + 1].expertise}
                />
              );
            }
          })}
        </View> */}
        <View>
          <ScrollView horizontal>
          <FlatList
          numColumns={2} 
          keyExtractor={(item, index) => String(item.id)}
          data ={dataDetails}
          renderItem={({item,index}) =>{
            return(
              <View style={{flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 0}}>
                <TouchableOpacity
                onPress={() =>navigation.navigate("MentorProfile",{userId:item.id,username:item.name,userName:item.email})}  //navigation.navigate("Profile",{userId:item.id})   console.log('mentor id ----',item.id)
                >
                <View>
                      {item.profile_image?
                        <Image
                            source={{ uri: item.profile_image }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 100,
                            }}
                        />
                        :
                        <Image 
                            source={require('../../assets/person_image.jpg')}
                            style={{
                              height: 170,
                              width: 170,
                              borderRadius: 100,
                          }}
                        />
                          }
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 20,
                                fontFamily: "MontserratMedium",
                            }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 20,
                                fontFamily: "MontserratMedium",
                            }}>
                            {item.expertise}
                        </Text>
                    </View>
                    </TouchableOpacity>
              </View>
            )
          }}
          />
          </ScrollView>
        </View>

        <Buttons
          onPress={() => {
            navigation.navigate("Our All");
          }}
          title="View all"
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </ScrollView>
    </View>
  );
}

connect()(OurMentors);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //height: SIZES.header * 0.9,
    width: DIM.width,
    backgroundColor: COLORS.light,
    justifyContent: "center",
   // alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "MontserratExtraBold",
    color: COLORS.white,
    marginTop: "13.5%",
  },
});

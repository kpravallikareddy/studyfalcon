/** @format */

import React, { useState, useEffect, useRef } from "react";

import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Image
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, DIM, SIZES, baseUrl } from "../../constants";
import { Buttons, Carousel, PickerItemComponent, QuesAns,SearchQuesAns } from "../components";
import { FlatList } from "react-native-gesture-handler";
import HTMLView from "react-native-htmlview";
import Icon from "../components/Icon";

// let trendingTags = [
//   { title: "Technology", id: "1" },
//   { title: "Govt. Exams", id: "2" },
//   { title: "Science", id: "1" },
//   { title: "Software development", id: "50" },
//   { title: "Diplomats", id: "1" },
//   { title: "php", id: "2" },
//   { title: "falcon", id: "1" },
//   { title: "india", id: "50" },
// ];

let trendingTags = [];

let response,
  json,
  trendFetched = [],
  categoryList = [];

export default function DiscussScreen({ navigation, route }) {
  const flatListRef = useRef();
  const [trendInd, setTrendInd] = useState();

  const [profileImage, setProfileImage] = useState("");

  const [data, setData] = useState([]);
  const [renderCatWise, setRenderCatWise] = useState(false);

  const [showTrend, setShowTrend] = useState(false);
  const [showloader, setShowloader] = useState(false);
  const [catWiseQues, setCatWiseQues] = useState([]);

  const [selectedValue, setSelectedValue] = useState("Select Categories");

  const [visible, setVisible] = useState(false);

  const userIdStr = route.params.data.userId;
  const username = route.params.data.username;
  const [idName, setIdName] = useState();
 // const [profileImage, setProfileImage] = useState();
  const [like, setLike] = useState(0);
  const [show, setShow] = useState(false);
  const [tagid, setTagid] = useState();
  const [quesid, setQuesid] = useState();
  const [notification, setNotification] = useState(0);
  const [comment, setComment] = useState();
  const [userloginid, setUserLoginid] = useState();
  const [quesindex, setQuesindex]=useState();
  const [image, setImage] = useState();

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      Alert.alert("Study Falcon", "Nothing Selected");
    }
  };

  // const placeholderText = "What is in your mind, " + username + "?";

  // let y = item.created_at.substr(0, 4);
  // let m = parseInt(item.created_at.substr(5, 7));
  // let mS = months[m - 1];
  // let d = item.created_at.substr(8, 2);
  // let wd = new Date(item.created_at.substr(0, 10)).getDay();

  // let dateAc = weekdayStr[wd];
  // let dt = dateAc + ", " + mS + " " + d + ", " + y;

  // allReply = [...allReply, item.answers];

  const categoryWiseQuestion = async (id) => {
    let response = await fetch(baseUrl + "/category_view/" + id, {
      method: "GET",
    });
    let json = await response.json();
    console.log('recent questions ---',json);
    setCatWiseQues(json.questions);
  };

  const getMentorDetails = async () => {
    let response = await fetch(baseUrl + "/all_mentor", {
      method: "GET",
    });
    let json = await response.json();
    setData(json.data);
  };

  const single = () => {
    const getData = async () => {
      response = await fetch(baseUrl + "/categories", {  //categories_list
        method: "GET",
      });
      json = await response.json();
      var temp = json.Data;
      for (var i = 0; i < temp.length; i++) {
        categoryList.push({ id: temp[i].id, name: temp[i].name });
      }
    };

    getData();
  };

  const gettrendingtags = async () => {
    response = await fetch(baseUrl + "/trending_tag_list", {  //categories_list
      method: "GET",
    });
    json = await response.json();
    var temp = json.Trending_tags;
    for (var i = 0; i < temp.length; i++) {
      trendingTags.push({ id: temp[i].id, name: temp[i].tag });
    }

    setShowloader(true);
    console.log('tags', trendingTags)
  };

  const getProfileImage = async () => {
    try {
      let myResponseForImage = await fetch(
        baseUrl + "/mentors_profile/" + userIdStr,
        {
          method: "GET",
        }
      );
      let json = await myResponseForImage.json();

      setProfileImage(json.Data.profile_image);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrend = async () => {
    response = await fetch(baseUrl + "/trending_tags/" + trendInd, {
      method: "GET",
    });
    json = await response.json();
    var temp = json.questions;
    for (var i = 0; i < temp.length; i++) {
      trendFetched.push(temp[i]);
    }
    console.log('questions', trendFetched)
  };

  const postComment = async () => {
    console.log('post pressed');
    console.log('quesid', quesid);
    console.log('loginid', userIdStr);
    console.log('userid', tagid);
    console.log('comment', comment);

    let formdata = new FormData();

    formdata.append("question_id", quesid);
    formdata.append("answer", comment);
    formdata.append("userid", tagid);
    formdata.append("login_id", userIdStr);
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



  useEffect(() => {
    single();
    getMentorDetails();
    getProfileImage();
    gettrendingtags();
    getTrend();

  }, []);

  const handleItemPress = () => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.light} style="light" />
      <View
        style={{
          //height: SIZES.header * 0.9,
          width: SIZES.width,
          backgroundColor: COLORS.light,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            marginTop: "13.5%",
            fontFamily: "MontserratExtraBold",
          }}
        >
          Discussion
        </Text>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{
            position: "absolute",
            height: SIZES.header * 0.9,
            //height: 50,
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
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View
          style={{
            height: 60,
            width: DIM.width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratRegular",
            }}
          >
            Why to carry doubt in your mind
          </Text>
        </View>
        <Buttons
          onPress={() => navigation.navigate("Post Question")}
          title="Ask Now"
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            padding: 20,
            height: DIM.height * 0.08,
            width: DIM.width * 0.85,
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 10,
            borderColor: COLORS.light,
            borderWidth: 4,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: COLORS.light,
              fontFamily: "MontserratRegular",
              flex: 1,
            }}
          >
            {selectedValue}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={COLORS.light}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={() => {
              setVisible(false);
            }}
          >
            <>
              <StatusBar backgroundColor={COLORS.light} style="light" />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: COLORS.light,
                  paddingTop: 30,
                }}
              >
                {categoryList.map((item, index) => {
                  return (
                    <PickerItemComponent
                      key={index}
                      onPress={() => {
                        setSelectedValue(item.name);

                        setVisible(false);
                        categoryWiseQuestion(item.id);
                        console.log(item.id);
                      }}
                      text={item.name}
                    />
                  );
                })}
              </View>
            </>
          </Modal>
        </TouchableOpacity>
        <View style={{ padding: 20, marginLeft: 12 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "MontserratExtraBold",
            }}
          >
            Our mentors
          </Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
          {/* <Carousel data={data} /> */}
          {/*<ScrollView
                contentContainerStyle={{
                    height: 230,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                height: 150,
                                width: 150,
                                marginRight: 20,
                                marginBottom: 10,
                                borderRadius: 75,
                                marginLeft:15,
                            }}>
                            <Image
                                source={
                                    { uri: item.profile_image }
                                }
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 75,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontFamily: "MontserratMedium",
                                    textAlign: "center",
                                }}>
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: "MontserratRegular",
                                    textAlign: "center",
                                }}>
                                {item.expertise}
                            </Text>
                        </View>
                    );
                })}

              </ScrollView>*/}

          <FlatList
            //ref={ref => (this.flatlist = ref)}
            contentContainerStyle={{ height: 230 }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity>
                  <View
                    key={index}
                    style={{
                      height: 150,
                      width: 150,
                      marginRight: 20,
                      marginBottom: 10,
                      borderRadius: 75,
                      marginLeft: 15,
                    }}>
                    <Image
                      source={
                        { uri: item.profile_image }
                      }
                      style={{
                        height: 150,
                        width: 150,
                        borderRadius: 75,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "MontserratMedium",
                        textAlign: "center",
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "MontserratRegular",
                        textAlign: "center",

                      }}>
                      {item.expertise}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: 60, right: 0 }}
          //onPress={() => { this.scroll.scrollTo({ x: Dimensions.get('window').width }) }}
          // onPress={() => this.flatlist.scrollToIndex({ index: 0 })}
          // onPress={() => handleItemPress()}
          >
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={40}
              color={COLORS.light}
            //style={{ position: "absolute", top: "30%", right: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 20, marginLeft: 12 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "MontserratExtraBold",
            }}
          >
            Trending Tags
          </Text>
        </View>
        {/* {showloader && ( */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trendingTags.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  await setTrendInd(item.id);
                  setShowTrend(true);
                  getTrend();
                }}
                style={{ paddingLeft: 20 }}
                key={index}
              >
                <View
                  style={{
                    height: DIM.height * 0.05,
                    alignItems: "center",
                    justifyContent: "center",
                    width: DIM.width * 0.4,
                    borderRadius: 40,
                    backgroundColor: COLORS.light,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "MontserratRegular",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    {/* {item.title} */}
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* )} */}
        {showTrend && (
          <View>
            {trendFetched.map((item, index) => {
              if (item.category_id === trendInd) {
                return (
                  // <QuesAns
                  //   key={index}
                  //   item={item}
                  //   image={profileImage}
                  //   username={username}
                  // />
                  <SearchQuesAns
                  key={index}
                  item={item}
                  image={image}
                  askedby_user_id={null}
                  username={username}
                  loginid={userIdStr}
                />
                );
              }
            })}
          </View>
        )}

        <View style={{ padding: 20, marginLeft: 12 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "MontserratExtraBold",
            }}
          >
            Recent Questions
          </Text>
        </View>
        <View style={{ marginBottom: 25 }}>
            {catWiseQues.map((item, index) => {
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
        {/* <View>
          {!renderCatWise &&
            catWiseQues.map((item, index) => {
              return (
                // <QuesAns
                //   key={index}
                //   item={item}
                //   image={profileImage}
                //   username={username}
                // />

                <View
                  style={{
                   // alignSelf: "baseline",
                    paddingLeft: 20,
                    paddingRight: 10,
                    borderWidth: 1,
                    borderColor: '#DDDDDD',
                    borderRadius: 10,
                    marginLeft:20,
                    marginRight:20,
                    marginBottom:10,
                    paddingBottom:10
                  }}
                >
                  <View style={{ marginTop: 20, flexDirection: "row", marginRight: 10 }}>
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
                        <HTMLView
                          value={item.question.toString()}
                          stylesheet={styles}
                          addLineBreaks={true}
                          paragraphBreak=""
                        />

                        <Text
                          style={{
                            fontFamily: "MontserratMedium",
                            fontSize: 14,
                            marginBottom: 5,
                          }}
                        >
                          {item.created_at}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", marginLeft:30 }}>

            <Icon name="thumb-up" color="green" num={item.question_upvoted} id={item.id} value={1} />
            <Icon name="thumb-down" color="red" num={item.question_downvoted} id={item.id} value={0} />
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

            <TouchableOpacity
            key={index}
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
                setQuesindex(index);
              }}
            >
              <MaterialCommunityIcons name='message' size={25} color='green' />

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
          {show &&  (
            <View>
              <View style={{flexDirection:'row',}}>
              <View
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 25,
                  paddingBottom: 5,
                  marginTop: 0,
                  marginLeft: 0,
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
                      paddingRight:35,
                    }}
                  />
                </View>
                </View>
                <TouchableOpacity 
               // style={{height:50,width:50,borderRadius:10,borderColor:COLORS.light,borderWidth:3,alignItems:'center',justifyContent:'center',marginTop:25}}
                style={{position:'absolute',right:20,top:40}}
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
          )}
        </View>
              );
            })
          }
        </View> */}
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
    fontFamily: "Anton",
    color: COLORS.white,
    marginTop: "13.5%",
  },
});

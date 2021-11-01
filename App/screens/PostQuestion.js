/** @format */

import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  Modal,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import * as DocumentPicker from "expo-document-picker";

import { SIZES, COLORS, DIM, baseUrl } from "../../constants";
import {
  Buttons,
  CustomButton,
  PickerItemComponent,
  SpecialPIcker,
} from "../components";

let categoryList = [],
  response,
  json,
  arr = [];

let typeList = ["Technology  ", "Govt. Exams  ", "Science  "];

//My task is to add the sub-categories API here.

// let subCategoryList = [
//   "Smartphones",
//   "Samsung",
//   "3G Mobiles",
//   "Keypad Mobile",
//   "Samsung",
//   "Samsung",
//   "Oneplus",
//   "Redmi",
//   "Oppo",
//   "Vivo",
//   "Micromax",
//   "Realme",
//   "POCO",
//   "Nokia",
//   "Reliance",
//   "Lava",
//   "Micromax",
//   "Karbonn",
//   "iphone",
//   "iphone",
// ];
let subCategoryList =[];

export default function PostQuestion({ navigation }) {
  const [ques, setQues] = useState();

  //For the first modal...

  const [vis1, setVis1] = useState(false);
  const [selectedValType, setSelectedValType] = useState(["Nothing selected"]);

  //For the second Modal...

  const [vis, setVis] = useState(false);
  const [selectedValueCat, setSelectedValueCat] = useState([
    "Select Categories",
  ]);

  //For the third Modal...

  const [vis2, setVis2] = useState(false);
  const [subselected, setSubSelected] = useState("Select Sub-Category");

  const [len, setLen] = useState(0);
  const [ind, setInd] = useState();
  const [subind, setSubInd] = useState();
  const [buttonTitle, setButtonTitle] = useState("Browse..");

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "cancel") {
      setButtonTitle(result.name);
    }
    console.log(result);
  };

  const getData = async () => {
    response = await fetch(baseUrl + "/categories", {  ///categories_list
      method: "GET",
    });
    
    json = await response.json();
  //  console.log('categorylist',json)
    var temp = json.Data;
    for (var i = 0; i < temp.length; i++) {
      categoryList.push({ id: temp[i].id, name: temp[i].name });
    }
    console.log('categorylist',categoryList)
  };

  const getSubcategories = async(id) => {
    setInd()
    response = await fetch(baseUrl + "/subcategories/"+id, {
      method: "GET",
    });
    json = await response.json();
    console.log('subcategories',json)
    var temp = json.categories;
    for (var i = 0; i < temp.length; i++) {
      subCategoryList.push({ id: temp[i].id, name: temp[i].name });
    }

    console.log('subcatlist',subCategoryList)
  }
  
  const postQuestion = async () => {
    let formdata = new FormData();

    formdata.append("userid", "2");
formdata.append("content", "dfhghgfj");
formdata.append("category_id", "1");
formdata.append("subcategory_id", "3");
formdata.append("content1", "hfgjhfg");

let link = baseUrl + "/postquestion";

let response = await fetch(link, {
  method: "POST",
  body: formdata,
});
let json = await response.json();
console.log('response',json)
if (json.status === 1) {
  Alert.alert(json.msg)
  navigation.goBack();
  //navigation.navigate("Drawer", { data: data });
} else {
  Alert.alert("Study Falcon", json.msg);
}
  }


  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View
        style={{
          height: SIZES.header ,
          width: SIZES.width,
          backgroundColor: COLORS.light,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            marginTop: "13%",
            fontFamily: "MontserratExtraBold",
          }}
        >
          Ask
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            //height: 50,
            height: SIZES.header,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            //top: SIZES.header * 0.9 * 0.43,
            top:'30%',
            left: 10,
          }}
        >
          <AntDesign name="left" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            marginTop: 20,
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 21,
              fontFamily: "MontserratRegular",
              textAlign: "center",
            }}
          >
            {"Ask a Question"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
          }}
        ></View>

        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 25,
            paddingBottom: 5,
            marginTop: 20,
            height: DIM.height * 0.15,
            // backgroundColor: "red",
            width: DIM.width,
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
              onChangeText={(text) => setQues(text)}
              numberOfLines={5}
              style={{
                fontSize: 16,
                fontStyle: "italic",
                flex: 1,
              }}
            />
          </View>
        </View>
        <CustomButton
          onPress={_pickDocument}
          flag={1}
          font_size={buttonTitle === "Browse.." ? 18 : 15}
          text={buttonTitle}
          style={{ alignSelf: "center", width: DIM.width * 0.9 }}
        />
        <TouchableOpacity
          onPress={() => setVis1(true)}
          style={{
            marginTop: 25,
            padding: 20,
            height: DIM.height * 0.09,
            width: DIM.width * 0.9,
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
              fontSize: len > 1 ? 16 : 22,
              color: COLORS.light,
              fontFamily: len > 1 ? "MontserratMedium" : "MontserratRegular",
              flex: 1,
            }}
          >
            {selectedValType.length === 0
              ? "Nothing selected"
              : selectedValType}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={COLORS.light}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={vis1}
            onRequestClose={() => {
              setVis1(false);
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
                {typeList.map((item, index) => {
                  return (
                    <SpecialPIcker
                      key={index}
                      onPress={() => {
                        setVis1(false);
                        if (arr.length === 0) {
                          setSelectedValType(arr);
                        }
                        if (!arr.includes(item)) {
                          arr.push(item);
                          setLen(arr.length);
                        } else {
                          arr = arr.filter((e) => e !== item);
                          setLen(arr.length);
                        }
                        setSelectedValType([...arr]);
                      }}
                      text={item}
                      arr={selectedValType}
                    />
                  );
                })}
              </View>
            </>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVis(true)}
          style={{
            marginTop: 25,
            padding: 20,
            height: DIM.height * 0.09,
            width: DIM.width * 0.9,
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
            {selectedValueCat}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={COLORS.light}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={vis}
            onRequestClose={() => {
              setVis(false);
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
                      onPress={  () => {
                         setSelectedValueCat(item.name);
                         setInd(item.id);
                        setVis(false);
                         getSubcategories(item.id);
                      }}
                      text={item.name}
                    />
                  );
                })}
              </View>
            </>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVis2(true)}
          style={{
            marginTop: 20,
            padding: 20,
            height: DIM.height * 0.09,
            width: DIM.width * 0.9,
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
            {subselected}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={COLORS.light}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={vis2}
            onRequestClose={() => {
              setVis2(false);
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  {subCategoryList.map((item, index) => {
                    return (
                      <PickerItemComponent
                        key={index}
                        onPress={ async () => {
                          await setSubSelected(item.name);
                          setSubInd(item.id);
                          setVis2(false);
                        }}
                        text={item.name}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </>
          </Modal>
        </TouchableOpacity>
        <Buttons
          style={{
            alignSelf: "center",
            width: DIM.width * 0.9,
            marginTop: 25,
          }}
          title="Post Now"
          onPress={() => {
            if (
              selectedValType.length !== 0 &&
              selectedValueCat !== "Select Categories" &&
              subselected !== "Select Sub-Category"
            ) {
              postQuestion();
              //Alert.alert("Study Falcon", "your question posted..");
              //navigation.goBack();
            } else {
              Alert.alert("Study Falcon", "Please fill all the fields");
            }
          }}
        />
      </ScrollView>
    </>
  );
}

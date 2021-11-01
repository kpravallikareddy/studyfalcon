/** @format */

import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { COLORS, DIM, SIZES, baseUrl } from "../../constants";
import { AppTextInput, Buttons, PickerItemComponent } from "../components";

import DateTimePickerModal from "react-native-modal-datetime-picker";

let response,
  json,
  categoryList = [];

export default function DefaultScreen({ navigation }) {
  const [selectedValue, setSelectedValue] = useState("Select Categories");

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [dtvisible, setDtVisible] = useState(false);

  const [date, setDate] = useState();

  const [ind, setInd] = useState();

  const [myDate, setMyDate] = useState("");
  const [selectedGender, setSelectedGender] = useState("Select Gender");

  const getData = async () => {
    response = await fetch(baseUrl + "/categories_list", {
      method: "GET",
    });
    json = await response.json();
    var temp = json.category_list;
    for (var i = 0; i < temp.length; i++) {
      categoryList.push({ id: temp[i].id, name: temp[i].name });
    }
    // console.log(categoryList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View>
        <StatusBar backgroundColor={COLORS.light} style="light" />
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.headerText}>Become a mentor</Text>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{
                position: "absolute",
                // backgroundColor: "red",
                //height: 50,
               // height: SIZES.header * 0.9,
                //width: 50,
               // justifyContent: "center",
                //alignItems: "center",
                top: SIZES.header * 0.9 * 0.6,
                right: 10,
              }}
            >
              <MaterialCommunityIcons name="menu" size={35} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: DIM.width,
              padding: 20,
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: 100,
                width: 150,
                backgroundColor: COLORS.light,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "MontserratLight",
                }}
              >
                Total {"\n"}Questions
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "700",
                  color: "white",
                }}
              >
                116
              </Text>
            </View>
            <View
              style={{
                height: 100,
                width: 150,
                backgroundColor: COLORS.light,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "MontserratLight",
                }}
              >
                Total {"\n"}Answers
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "700",
                  color: "white",
                }}
              >
                223
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              padding: 20,
              height: DIM.height * 0.09,
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
                          setInd(item.id);
                          setVisible(false);
                        }}
                        text={item.name}
                      />
                    );
                  })}
                </View>
              </>
            </Modal>
          </TouchableOpacity>

          <AppTextInput
            placeholder="First Name"
            style={{ marginTop: 20, alignSelf: "center" }}
          />
          <AppTextInput placeholder="Last Name" style={{ alignSelf: "center" }} />

          <TouchableOpacity
            onPress={() => setVisible1(true)}
            style={{
              padding: 20,
              height: DIM.height * 0.09,
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
              {selectedGender}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={30}
              color={COLORS.light}
            />
            <Modal
              transparent={true}
              animationType="slide"
              visible={visible1}
              onRequestClose={() => {
                setVisible1(false);
              }}
            >
              <>
                <StatusBar backgroundColor={COLORS.light} style="light" />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.light,
                  }}
                >
                  <PickerItemComponent
                    onPress={() => {
                      setSelectedGender("Male");
                      setVisible1(false);
                    }}
                    text="Male"
                  />
                  <PickerItemComponent
                    onPress={() => {
                      setVisible1(false);
                      setSelectedGender("Female");
                    }}
                    text="Female"
                  />
                </View>
              </>
            </Modal>
          </TouchableOpacity>

          <View>
            <AppTextInput
              onPress={() => setDtVisible(dtvisible === false ? true : false)}
              placeholder={myDate === "" ? " mm/dd/yyyy" : myDate}
              iconRight="calendar"
              style={{ alignSelf: "center", marginTop: 20 }}
            />
            <DateTimePickerModal
              isVisible={dtvisible}
              onCancel={() => setVisible(!dtvisible)}
              onConfirm={(date) => {
                let month = date.getUTCMonth() + 1;
                let d = date.getUTCDate();
                let year = date.getFullYear();
                setMyDate(month + "/" + d + "/" + year);
                setDate(date);
              }}
            />
          </View>
          <AppTextInput placeholder="Phone" style={{ alignSelf: "center" }} />
          <AppTextInput
            placeholder="Qualification"
            style={{ alignSelf: "center" }}
          />
          <AppTextInput placeholder="Email" style={{ alignSelf: "center" }} />
          <AppTextInput placeholder="Address" style={{ alignSelf: "center" }} />
          <AppTextInput
            placeholder="Experience"
            style={{ alignSelf: "center" }}
          />

          <AppTextInput placeholder="Expertise" style={{ alignSelf: "center" }} />
          <AppTextInput placeholder="City" style={{ alignSelf: "center" }} />
          <AppTextInput placeholder="Zip" style={{ alignSelf: "center" }} />
          <Buttons title="Sign Up" style={{ alignSelf: "center" }} />
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
     // alignItems: "center",
  },
      headerText: {
        fontSize: 27,
      fontFamily: "MontserratExtraBold",
      color: COLORS.white,
      marginRight: 15,
      marginTop: "13.5%",
  },
});

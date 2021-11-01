/** @format */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, DIM, SIZES, baseUrl } from "../../constants";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Carousel } from "../components";

export default function AllMentors({ navigation }) {
  // const [data, setData] = useState([]);

  const [dataDetails, setDataDetails] = useState([]);

  const getMentorDetails = async () => {
    let response = await fetch(baseUrl + "/all_mentor", {
      method: "GET",
    });
    let json = await response.json();
    // console.log(json.data);
    setDataDetails(json.data);
  };

  useEffect(() => {
    getMentorDetails();
  }, []);

  // console.log(dataDetails);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Mentors</Text>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{
            position: "absolute",
            // backgroundColor: "red",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            top: SIZES.header * 0.9 * 0.45,
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
        <View>
          <Text
            style={{
              fontSize: 27,
              fontFamily: "MontserratRegular",
              marginLeft: 20,
              marginTop: 20,
            }}
          >
            Meet Our
          </Text>
          <Text
            style={{
              color: COLORS.pink,
              fontSize: 50,
              fontFamily: "MontserratExtraBold",
              marginLeft: 20,
            }}
          >
            Mentors
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 21,
              fontFamily: "MontserratRegular",
            }}
          >
            {"Mathematics"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Carousel data={dataDetails} />
        </View>
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"Computer"}
          </Text>
        </View>

        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
        <Carousel data={dataDetails} />
        <View style={{ marginLeft: 20 }}></View>
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"study falcon"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />

        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"amaiya"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"rock"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"python"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"photon"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 80,
            width: 170,
            marginLeft: 20,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 23,
              fontFamily: "MontserratRegular",
            }}
          >
            {"Chip"}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            width: DIM.width * 0.9,
            marginLeft: 20,
            backgroundColor: COLORS.light,
            marginBottom: 20,
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: SIZES.header * 0.9,
    width: DIM.width,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "MontserratExtraBold",
    color: COLORS.white,
    marginTop: "10%",
  },
});

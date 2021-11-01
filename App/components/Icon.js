/** @format */

import React,{ useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    COLORS,
    months,
    weekdayStr,
    baseUrlUpload,
    baseUrl,
  } from "../../constants";
export default function Icon({ num, name, color, id, value }) {
    
    const [like,setLike] = useState(0);
  const [quesid, setQuesid] = useState();

  const postLikes = async (id) => {
    // console.log('like pressed');
    // console.log('quesid',quesid);
    // console.log('id',id);
    // console.log('value',like);

    let response1 = await fetch(
      baseUrl + "/ques_ans_feedback/ques/"+id+'/'+like,
      {
        method: "GET",
      }
    );
    let json1 = await response1.json();
    //console.log('likes response',json1)
    alert(json1.msg);
  };

  const postComment = async (id) => {
    // console.log('like pressed');
    // console.log('quesid',quesid);
    // console.log('id',id);
    // console.log('value',like);

    let formdata = new FormData();

    formdata.append("question_id", id);
formdata.append("answer", "dfhghgfj");
formdata.append("userid",2 );
formdata.append("login_id", 145);


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
  };



    return (
        <>
            <Text>{num}</Text>
            <TouchableOpacity
                style={{
                    height: 40,
                    width: 40,
                    borderRadius: 30,
                    borderColor: color,
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 7,
                    marginRight: 10,  
                }}
                onPress={() =>{
                    setLike(value);
                    setQuesid(id);
                    postLikes(quesid);
                }}
               >
                <MaterialCommunityIcons name={name} size={25} color={color} />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({});

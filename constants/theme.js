/** @format */

import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const DIM = {
  height: height,
  width: width,
};

export const config_ios = `884911465470-pmois3p85vepf6sc24i6ui0dprbk4ng5.apps.googleusercontent.com`;

export const config_android = `884911465470-gvomp4l57ohpa2n0751isg98gps3ooir.apps.googleusercontent.com`;

export const SIZES = {
  normal: height * 0.015,
  header: height * 0.13,
};

export const baseUrl =
  "https://study-falcon.ammaiya.in/Apicontroller";
  //"https://webapplicationindia.com/demo/study-falcon/Apicontroller";

export const COLORS = {
  boxColor: "#cbd4da",
  primary: "#342b55",
  light: "#058D8B",
  secondary: "#63f59e",
  white: "white",
  black: "black",
  lightBlack: "#444141",
  pink: "#e2908e",
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const baseUrlUpload =
"https://study-falcon.ammaiya.in/uploads/";
 // "https://webapplicationindia.com/demo/study-falcon/uploads/";

export const weekdayStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const appTheme = { DIM, COLORS, SIZES };
export default appTheme;

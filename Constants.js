import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const GROUND_HEIGHT = SCREEN_HEIGHT * 0.05;
const OBSTACLE_HEIGHT = SCREEN_HEIGHT * 0.33;

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  PLAYER_HEIGHT: SCREEN_HEIGHT * 0.075,
  GROUND_HEIGHT,
  OBSTACLE_HEIGHT,
};

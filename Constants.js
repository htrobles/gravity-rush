import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const GROUND_HEIGHT = SCREEN_HEIGHT * 0.05;
const OBSTACLE_HEIGHT = SCREEN_HEIGHT * 0.33;
const CONTROL_BUTTON_SIZE = SCREEN_HEIGHT * 0.25;
const DASH_MAX_PROGRESS = 5;
const SCORE_INCREMENT = 1;

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  PLAYER_SIZE: SCREEN_HEIGHT * 0.125,
  GROUND_HEIGHT,
  OBSTACLE_HEIGHT,
  CONTROL_BUTTON_SIZE,
  DASH_MAX_PROGRESS,
  SCORE_INCREMENT,
};

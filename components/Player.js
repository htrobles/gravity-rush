import { Dimensions, View } from "react-native";
import Matter from "matter-js";
import Constants from "../Constants";

const Player = ({ body, flipped }) => {
  const {
    position: { x, y },
  } = body;
  const xPos = x - Constants.PLAYER_HEIGHT / 2;
  const yPos = y - Constants.PLAYER_HEIGHT / 2;

  return (
    <View
      style={{
        width: Constants.PLAYER_HEIGHT,
        height: Constants.PLAYER_HEIGHT,
        left: xPos,
        top: yPos,
        borderWidth: 1,
        borderColor: "#000",
        position: "absolute",
        transform: [{ scaleY: flipped ? -1 : 1 }],
      }}
    ></View>
  );
};

export default (world, pos, extraOptions) => {
  const player = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    Constants.PLAYER_HEIGHT,
    Constants.PLAYER_HEIGHT,
    {
      label: "Player",
      isStatic: false,
      mass: 10,
    }
  );
  Matter.World.add(world, player);
  return { body: player, pos, extraOptions, renderer: <Player /> };
};

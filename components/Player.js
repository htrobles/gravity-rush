import { Dimensions, View } from "react-native";
import Matter from "matter-js";
import Constants from "../Constants";

const Player = ({ body, flipped }) => {
  const {
    position: { x, y },
  } = body;
  const xPos = x - Constants.PLAYER_SIZE / 2;
  const yPos = y - Constants.PLAYER_SIZE / 2;

  return (
    <View
      style={{
        width: Constants.PLAYER_SIZE,
        height: Constants.PLAYER_SIZE,
        left: xPos,
        top: yPos,
        borderWidth: 1,
        borderColor: "#fff",
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
    Constants.PLAYER_SIZE,
    Constants.PLAYER_SIZE,
    {
      label: "Player",
      isStatic: false,
      frictionStatic: 0,
      friction: 0,
      // mass: 10,
    }
  );
  Matter.World.add(world, player);
  return { body: player, pos, extraOptions, renderer: <Player /> };
};

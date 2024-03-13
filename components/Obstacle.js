import { Dimensions, View } from "react-native";
import Matter from "matter-js";
import Constants from "../Constants";

const Obstacle = ({ body, size, isDangerous }) => {
  const {
    position: { x, y },
  } = body;
  const xPos = x - size / 2;
  const yPos = y - size / 2;

  return (
    <View
      style={{
        width: size,
        height: size,
        left: xPos,
        top: yPos,
        borderColor: isDangerous ? "red" : "#fff",
        borderWidth: 1,
        position: "absolute",
      }}
    ></View>
  );
};

export default (world, options) => {
  const { pos, isDangerous } = options;
  const size = Constants.OBSTACLE_HEIGHT;

  const obstacle = Matter.Bodies.rectangle(pos.x, pos.y, size, size, {
    isStatic: true,
    isDangerous,
  });

  Matter.World.add(world, obstacle);

  return { body: obstacle, size: size, isDangerous, renderer: <Obstacle /> };
};

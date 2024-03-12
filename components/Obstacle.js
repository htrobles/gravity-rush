import { Dimensions, View } from "react-native";
import Matter from "matter-js";

const Obstacle = ({ body, options }) => {
  const { size, isDangerous } = options;
  const {
    position: { x, y },
  } = body;
  const { width, height } = size;

  const xPos = x - width / 2;
  const yPos = y - height / 2;

  return (
    <View
      style={{
        width: width,
        height: height,
        left: xPos,
        top: yPos,
        borderColor: isDangerous ? "red" : "black",
        borderWidth: 1,
        position: "absolute",
      }}
    ></View>
  );
};

export default (world, options) => {
  const { pos, size, label, isStatic, isObstacle, isDangerous } = options;

  const obstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: label,
      isStatic,
      isObstacle,
      isDangerous,
    }
  );

  Matter.World.add(world, obstacle);

  return { body: obstacle, options, renderer: <Obstacle /> };
};

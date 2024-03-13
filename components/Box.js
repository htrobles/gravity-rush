import { View } from "react-native";
import Matter from "matter-js";

const Box = ({ size, body }) => {
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
        borderColor: "#fff",
        borderWidth: 1,
        position: "absolute",
      }}
    ></View>
  );
};

export default (world, pos, size, extraOptions) => {
  const { label, isStatic, isObstacle } = extraOptions;

  const box = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: label,
    isStatic,
    isObstacle,
    isDangerous: true,
  });
  Matter.World.add(world, box);

  return { body: box, pos, size, extraOptions, renderer: <Box /> };
};

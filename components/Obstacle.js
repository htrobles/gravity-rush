import { Dimensions, View } from "react-native";
import Matter from "matter-js";
import Constants from "../Constants";
import { useEffect } from "react";
import SpriteSheet from "rn-sprite-sheet";

const Obstacle = ({ body, size, isDangerous }) => {
  let obstacle = null;

  const {
    position: { x, y },
  } = body;
  const xPos = x - size / 2;
  const yPos = y - size / 2;

  useEffect(() => {
    switch (isDangerous) {
      case true:
        obstacle.play({
          type: "dangerous",
          loop: true,
        });
        break;
      default:
        obstacle.play({
          type: "safe",
          loop: true,
        });
        break;
    }
  }, [isDangerous]);

  return (
    <View
      style={{
        width: size,
        height: size,
        left: xPos,
        top: yPos,
        position: "absolute",
      }}
    >
      <SpriteSheet
        ref={(ref) => (obstacle = ref)}
        source={require("../assets/obstacleSprite.png")}
        columns={12}
        rows={2}
        height={Constants.OBSTACLE_HEIGHT} // set either, none, but not both
        //width={width}
        // onLoad={() => initiateAnimation()} //start action on loading the spritesheet; uncomment this if you want a default animation
        imageStyle={{ marginTop: 0 }}
        animations={{
          safe: Array.from({ length: 12 }, (v, i) => i),
          dangerous: Array.from({ length: 12 }, (v, i) => i + 12),
        }}
      />
    </View>
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

  return {
    body: obstacle,
    size: size,
    isDangerous,
    renderer: <Obstacle />,
  };
};

import { Dimensions, View } from "react-native";
import Matter from "matter-js";
import Constants from "../Constants";
import SpriteSheet from "rn-sprite-sheet";
import { useEffect } from "react";

const Player = ({ body, flipped, animOpitons: { animType } }) => {
  let player = null;
  const {
    position: { x, y },
  } = body;
  const xPos = x - Constants.PLAYER_SIZE / 2;
  const yPos = y - Constants.PLAYER_SIZE / 2;

  let initiateAnimation = () => {
    player.play({
      type: "float",
      loop: true,
    });
  };

  useEffect(() => {
    switch (animType) {
      case "float":
        player.play({
          type: "float",
          loop: true,
        });
        break;
      default:
        player.play({
          type: "dead",
        });
        break;
    }
  }, [animType]);

  return (
    <View
      style={{
        width: Constants.PLAYER_SIZE,
        height: Constants.PLAYER_SIZE,
        left: xPos,
        top: yPos,
        position: "absolute",
        transform: [{ scaleY: flipped ? -1 : 1 }],
      }}
    >
      <SpriteSheet
        ref={(ref) => (player = ref)}
        source={require("../assets/playerSprite.png")}
        columns={8}
        rows={2}
        height={Constants.PLAYER_SIZE} // set either, none, but not both
        //width={width}
        onLoad={() => initiateAnimation()} //start action on loading the spritesheet; uncomment this if you want a default animation
        imageStyle={{ marginTop: 0 }}
        animations={{
          float: Array.from({ length: 8 }, (v, i) => i),
          dead: Array.from({ length: 6 }, (v, i) => i + 8),
        }}
      />
    </View>
  );
};

export default (world, pos, extraOptions, animOpitons) => {
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
  return { body: player, pos, extraOptions, animOpitons, renderer: <Player /> };
};

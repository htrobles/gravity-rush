import Matter from "matter-js";
import Constants from "../Constants";
import Player from "../components/Player";
import Box from "../components/Box";
import Obstacle from "../components/Obstacle";
import { getY } from "../_utils";

const GROUND_HEIGHT = Constants.SCREEN_HEIGHT * 0.05;

export default function entities() {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.5;

  return {
    physics: { engine, world },
    Player: Player(world, {
      x: Constants.SCREEN_WIDTH / 2,
      y: Constants.SCREEN_HEIGHT / 2,
    }),
    Ceiling: Box(
      world,
      {
        x: Constants.SCREEN_WIDTH / 2,
        y: GROUND_HEIGHT / 2,
      },
      { width: Constants.SCREEN_WIDTH * 1.1, height: GROUND_HEIGHT },
      { label: "Ceiling", isStatic: true }
    ),
    Ground: Box(
      world,
      {
        x: Constants.SCREEN_WIDTH / 2,
        y: Constants.SCREEN_HEIGHT - GROUND_HEIGHT / 2,
      },
      { width: Constants.SCREEN_WIDTH * 1.1, height: GROUND_HEIGHT },
      { label: "Ground", isStatic: true }
    ),
    Obstacle1: Obstacle(world, {
      pos: {
        x: Constants.SCREEN_WIDTH + Constants.OBSTACLE_HEIGHT / 2,
        y: getY(),
      },
      size: {
        width: Constants.SCREEN_HEIGHT * 0.3,
        height: Constants.SCREEN_HEIGHT * 0.5,
      },
      isStatic: true,
      isObstacle: true,
      isDangerous: false,
    }),
    Obstacle2: Obstacle(world, {
      pos: {
        x: Constants.SCREEN_WIDTH * 1.385 + Constants.OBSTACLE_HEIGHT / 2,
        y: getY(),
      },
      size: {
        width: Constants.SCREEN_HEIGHT * 0.3,
        height: Constants.SCREEN_HEIGHT * 0.5,
      },
      isStatic: true,
      isObstacle: true,
      isDangerous: false,
    }),
    Obstacle3: Obstacle(world, {
      pos: {
        x: Constants.SCREEN_WIDTH * 1.77 + Constants.OBSTACLE_HEIGHT / 2,
        y: getY(),
      },
      size: {
        width: Constants.SCREEN_HEIGHT * 0.3,
        height: Constants.SCREEN_HEIGHT * 0.5,
      },
      isStatic: true,
      isObstacle: true,
      isDangerous: false,
    }),
  };
}

import Matter from "matter-js";
import Constants from "./Constants";
import { getY, roll } from "./_utils";

const Physics = (entities, { touches, dispatch, events, time }) => {
  let engine = entities.physics.engine;

  // Obstacle Movement
  for (let i = 1; i <= 3; i++) {
    // TODO update i max to 2
    const box = entities[`Obstacle${i}`];

    if (box.body.bounds.max.x < 0) {
      if (roll(50)) {
        box.isDangerous = true;
      } else {
        box.isDangerous = false;
      }

      Matter.Body.setPosition(box.body, {
        x: Constants.SCREEN_WIDTH + Constants.OBSTACLE_HEIGHT / 2,
        y: getY(),
      });
    } else {
      Matter.Body.translate(box.body, { x: -3, y: 0 }); // Translate by 10 units in the x-axis
    }
  }

  touches
    .filter((t) => t.type === "press")
    .forEach(() => {
      if (!engine.world.gravity.y) {
        engine.world.gravity.y = 0.5;
      } else {
        engine.world.gravity.y *= -1; // Reverse the gravity (you can adjust this logic based on your needs)
      }
    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;

import Matter from "matter-js";
import Constants from "./Constants";
import { getY } from "./_utils";

export function switchGravity(engine) {
  if (!engine.world.gravity.y) {
    engine.world.gravity.y = 0.5;
  } else {
    engine.world.gravity.y *= -1;
  }
}

export function pushPlayer(entity) {
  Matter.Body.applyForce(entity.body, entity.body.position, { x: 0.125, y: 0 });
}

export function resetGame(entities, dispatch) {
  const engine = entities.physics.engine;

  Matter.Body.setPosition(entities.Player.body, {
    x: Constants.SCREEN_WIDTH / 2,
    y: Constants.SCREEN_HEIGHT / 2,
  });
  Matter.Body.setVelocity(entities.Player.body, { x: 0, y: 0 });

  for (let i = 1; i <= 3; i++) {
    const box = entities[`Obstacle${i}`];

    let x;

    switch (i) {
      case 1:
        x = Constants.SCREEN_WIDTH + Constants.OBSTACLE_HEIGHT / 2;
        break;
      case 2:
        x = Constants.SCREEN_WIDTH * 1.385 + Constants.OBSTACLE_HEIGHT / 2;
        break;
      case 3:
        x = Constants.SCREEN_WIDTH * 1.77 + Constants.OBSTACLE_HEIGHT / 2;
        break;
      default:
        break;
    }

    Matter.Body.setPosition(box.body, {
      x: x,
      y: getY(),
    });
    box.isDangerous = false;
    box.body.isDangerous = false;
    engine.world.gravity.y = 0.5;

    dispatch({ type: "pause" });
  }
}

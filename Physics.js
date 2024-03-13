import Matter from "matter-js";
import Constants from "./Constants";
import { getY, roll } from "./_utils";
import { pushPlayer, resetGame, switchGravity } from "./gameFunctions";

const Physics = (entities, { touches, dispatch, events, time }) => {
  const engine = entities.physics.engine;
  const deltaTime = time.delta / 1000; // Convert milliseconds to seconds

  // Obstacle Movement
  for (let i = 1; i <= 3; i++) {
    const box = entities[`Obstacle${i}`];

    if (box.body.bounds.max.x < 0) {
      dispatch({ type: "add-score" });

      if (roll(50)) {
        box.isDangerous = true;
        box.body.isDangerous = true;
      } else {
        box.isDangerous = false;
        box.body.isDangerous = false;
      }

      Matter.Body.setPosition(box.body, {
        x: Constants.SCREEN_WIDTH + Constants.OBSTACLE_HEIGHT / 2,
        y: getY(),
      });
    } else {
      const translationX = -200 * deltaTime;
      Matter.Body.translate(box.body, { x: translationX, y: 0 });
    }
  }

  // Events
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      switch (events[i].type) {
        case "switch-gravity":
          switchGravity(engine);
          break;
        case "dash":
          pushPlayer(entities.Player);
          break;
        case "reset-game":
          resetGame(entities, dispatch);
          break;
        default:
          break;
      }
    }
  }

  // Collision
  Matter.Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;
    const objABody = pairs[0].bodyA;
    const objBBody = pairs[0].bodyB;

    if (objABody.isDangerous || objBBody.isDangerous) {
      dispatch({
        type: "game-over",
      });
    }
  });

  // Player Leave the Screen
  if (entities.Player.body.bounds.max.x < 0) {
    dispatch({ type: "game-over" });
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;

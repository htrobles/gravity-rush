import Matter from "matter-js";
import Constants from "./Constants";
import { getY, roll } from "./_utils";
import { pushPlayer, switchGravity } from "./gameFunctions";

const Physics = (entities, { touches, dispatch, events, time }) => {
  let engine = entities.physics.engine;

  // Obstacle Movement
  for (let i = 1; i <= 1; i++) {
    // TODO update i max to 2
    const box = entities[`Obstacle${i}`];

    for (let i = 1; i <= 3; i++) {
      const box = entities[`Obstacle${i}`];

      if (box.body.bounds.max.x < 0) {
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
        Matter.Body.translate(box.body, { x: -3, y: 0 });
      }
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
                x =
                  Constants.SCREEN_WIDTH * 1.385 +
                  Constants.OBSTACLE_HEIGHT / 2;
                break;
              case 3:
                x =
                  Constants.SCREEN_WIDTH * 1.77 + Constants.OBSTACLE_HEIGHT / 2;
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

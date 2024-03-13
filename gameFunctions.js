import Matter from "matter-js";

export function switchGravity(engine) {
  if (!engine.world.gravity.y) {
    engine.world.gravity.y = 0.5;
  } else {
    engine.world.gravity.y *= -1;
  }
}

export function dash(entity) {
  Matter.Body.applyForce(entity.body, entity.body.position, { x: 0.125, y: 0 });
}

import Matter from "matter-js";

export function switchGravity(engine) {
  if (!engine.world.gravity.y) {
    engine.world.gravity.y = 0.5;
  } else {
    engine.world.gravity.y *= -1;
  }
}

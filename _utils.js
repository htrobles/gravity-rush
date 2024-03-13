import Constants from "./Constants";

export function roll(probability) {
  const validPercentage = Math.min(100, Math.max(0, probability));

  const randomNumber = Math.random() * 100;

  return randomNumber <= validPercentage;
}

export function getY() {
  const min = Constants.OBSTACLE_HEIGHT / 2 + Constants.GROUND_HEIGHT;
  const max =
    Constants.SCREEN_HEIGHT -
    Constants.OBSTACLE_HEIGHT / 2 -
    Constants.GROUND_HEIGHT;

  return Math.random() * (max - min) + min;
}

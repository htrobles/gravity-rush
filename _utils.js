export function roll(probability) {
  const validPercentage = Math.min(100, Math.max(0, probability));

  const randomNumber = Math.random() * 100;

  return randomNumber <= validPercentage;
}

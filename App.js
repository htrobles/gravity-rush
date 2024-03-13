import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Physics from "./Physics";
import entities from "./entities";
import Constants from "./Constants";
import ControlButton from "./components/ControlButton";
import GameOverModal from "./components/GameOverModal";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(false);
  const [isGravityDown, setIsGravityDown] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [dashProgress, setDashProgress] = useState(0);
  const [dashes, setDashes] = useState(1);

  const handlePressSwitchGravity = () => {
    if (!running) {
      setRunning(true);
    } else {
      setIsGravityDown(!isGravityDown);
      gameEngine.dispatch({ type: "switch-gravity" });
    }
  };

  const handlePressDash = () => {
    gameEngine.dispatch({ type: "dash" });
  };

  const handleGainDashProgress = () => {
    if (dashes < 5) {
      if (dashProgress < 5) {
        setDashProgress(dashProgress + 1);
      } else {
        setDashes(dashes + 1);
        setDashProgress(0);
      }
    }
  };

  const handleEvent = (e) => {
    switch (e.type) {
      case "game-over":
        setRunning(false);
        setShowGameOver(true);
        break;
      case "pause":
        setRunning(false);
        break;
      case "add-score":
        setScore(score + 1);
        handleGainDashProgress();
        break;
      default:
        break;
    }
  };

  const handleRestart = () => {
    setRunning(true);
    gameEngine.dispatch({ type: "reset-game" });
    setShowGameOver(false);
    setScore(0);
    setDashProgress(0);
    setDashes(1);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        style={styles.container}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={handleEvent}
      >
        <StatusBar hidden={true} />
      </GameEngine>
      <ControlButton
        styles={[styles.switchGravityBtn]}
        onPress={handlePressSwitchGravity}
      >
        {!running ? "Start" : isGravityDown ? "Up" : "Down"}
      </ControlButton>
      {running ? (
        <ControlButton styles={[styles.dashBtn]} onPress={handlePressDash}>
          {dashes}
        </ControlButton>
      ) : null}
      <Scoreboard score={score} />
      {showGameOver ? <GameOverModal onRestart={handleRestart} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1e2b",
  },
  switchGravityBtn: {
    bottom: Constants.SCREEN_HEIGHT * 0.05,
    left: Constants.SCREEN_HEIGHT * 0.05,
  },
  dashBtn: {
    bottom: Constants.SCREEN_HEIGHT * 0.05,
    right: Constants.SCREEN_HEIGHT * 0.05,
  },
});

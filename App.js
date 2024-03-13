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
import DashButton from "./components/DashButton";

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
    if (dashes > 0) {
      gameEngine.dispatch({ type: "dash" });
      setDashes(dashes - 1);
    }
  };

  const handleGainDashProgress = () => {
    if (dashes < 5) {
      if (dashProgress + 1 >= Constants.DASH_MAX_PROGRESS) {
        setDashes(dashes + 1);
        setDashProgress(0);
      } else {
        setDashProgress(dashProgress + 1);
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
        setScore(score + Constants.SCORE_INCREMENT);
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
        <DashButton
          styles={[styles.dashBtn]}
          onPress={handlePressDash}
          progress={dashProgress}
        >
          {dashes}
        </DashButton>
      ) : null}
      <Scoreboard score={score} />
      {showGameOver ? (
        <GameOverModal onRestart={handleRestart} score={score} />
      ) : null}
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

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Physics from "./Physics";
import entities from "./entities";
import Constants from "./Constants";
import ControlButton from "./components/ControlButton";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(false);
  const [isGravityDown, setIsGravityDown] = useState(true);

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
          Dash
        </ControlButton>
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

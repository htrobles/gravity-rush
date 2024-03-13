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
    setIsGravityDown(!isGravityDown);
    gameEngine.dispatch({ type: "switch-gravity" });
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
        running={true}
      >
        <StatusBar hidden={true} />
      </GameEngine>
      <ControlButton
        styles={[styles.switchGravity]}
        onPress={handlePressSwitchGravity}
      >
        {isGravityDown ? "Up" : "Down"}
      </ControlButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1e2b",
  },
});

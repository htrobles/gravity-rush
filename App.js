import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Physics from "./Physics";
import entities from "./entities";
import Constants from "./Constants";

export default function App() {
  const [running, setRunning] = useState(false);

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.container}
        systems={[Physics]}
        entities={entities()}
        running={true}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0f1e2b",
  },
});

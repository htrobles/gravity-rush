import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Scoreboard({ score }) {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, .25)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Scoreboard;

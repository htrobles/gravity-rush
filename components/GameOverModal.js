import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function GameOverModal() {
  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.heading]}>Game Over</Text>
        <Text style={[styles.text, styles.subheading]}>Try again?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    backgroundColor: "rgba(255, 255, 255, .25)",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fff",
    top: 0,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default GameOverModal;

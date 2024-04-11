import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Splashscreen({ onHide }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>GRAVITY RUSH</Text>
      <TouchableOpacity style={styles.startBtn} onPress={onHide}>
        <Text style={styles.startBtnText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.8)",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#5f6e7b",
  },
  startBtn: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 80,
  },
  startBtnText: {
    color: "#fff",
  },
});

export default Splashscreen;

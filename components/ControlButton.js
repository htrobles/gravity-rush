import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import Constants from "../Constants";

function ControlButton({ styles, children, onPress }) {
  return (
    <TouchableHighlight
      style={[localStyles.controlButton, ...styles]}
      underlayColor={"rgba(255, 255, 255, .7)"}
      onPress={onPress}
    >
      <Text style={localStyles.controlButtonText}>{children}</Text>
    </TouchableHighlight>
  );
}

const localStyles = StyleSheet.create({
  controlButton: {
    position: "absolute",
    width: Constants.CONTROL_BUTTON_SIZE,
    height: Constants.CONTROL_BUTTON_SIZE,
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: Constants.CONTROL_BUTTON_SIZE * 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
  },
  controlButtonText: {
    color: "#fff",
  },
});

export default ControlButton;

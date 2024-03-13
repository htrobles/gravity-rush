import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Constants from "../Constants";

function DashButton({ styles, children, onPress, progress }) {
  return (
    <TouchableHighlight
      style={[localStyles.controlButton, ...styles]}
      underlayColor={"rgba(255, 255, 255, .7)"}
      onPress={onPress}
    >
      <View
        style={{
          width: Constants.CONTROL_BUTTON_SIZE,
          height: Constants.CONTROL_BUTTON_SIZE,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            localStyles.progressBar,
            {
              height:
                Constants.CONTROL_BUTTON_SIZE /
                (Constants.DASH_MAX_PROGRESS / progress),
            },
          ]}
        />
        <Text style={localStyles.controlButtonText}>{children}</Text>
      </View>
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
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    width: Constants.CONTROL_BUTTON_SIZE,
  },
  controlButtonText: {
    color: "#fff",
  },
});

export default DashButton;

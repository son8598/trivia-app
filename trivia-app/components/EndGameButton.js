import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function EndGameButton(props) {
    const {navigation} = props;
    const pressHandlerGame = () => {
      navigation.navigate(props.goTo)
    }
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={pressHandlerGame}>
      <Text style={styles.caption}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCCCCC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default EndGameButton;

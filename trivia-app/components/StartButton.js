import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import ComicText from "../components/ComicText";

function StartButton(props) {
  const {navigation} = props;
  const pressHandlerGame = () => {
    navigation.navigate('Game')
  }
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={pressHandlerGame}>
      <ComicText style={styles.caption} text='Start' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E91E63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    color: "#fff",
    marginRight: 0,
    marginLeft: 52,
    fontSize: 30,
  }
});

export default StartButton;

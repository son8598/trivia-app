import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ComicText from "../components/ComicText";

function LeaderboardButton(props) {
  const {navigation} = props;
  const pressHandlerLeaderboard = () => {
    navigation.navigate('Leaderboard')
  }
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={pressHandlerLeaderboard}>
      <ComicText style={styles.caption} text='History' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009688",
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
    marginLeft: 52,
    fontSize: 30,
  }
});

export default LeaderboardButton;

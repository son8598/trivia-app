// Home screen 

import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, AsyncStorage } from "react-native";
import StartButton from "../components/StartButton";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LeaderboardButton from "../components/LeaderboardButton";
import ComicText from "../components/ComicText";


export default function Home ({ navigation }) {
  // Initialize local storage
  useEffect(() => {
    const _initStorage = async () => {
      const leaderboard = await AsyncStorage.getItem('leaderboard');
      if (!leaderboard) {
        await AsyncStorage.setItem('leaderboard', JSON.stringify([]));
      }
    };
    _initStorage();
  }, []);
    return (
      <View style={styles.container}>
        <ComicText style={styles.triviasTime} text='Trivia Time' />
        <View style={styles.rect}>
            <View style={styles.materialButtonPinkStack}>
            <StartButton
                navigation={navigation}
                style={styles.materialButtonPink}
            ></StartButton>
            <MaterialCommunityIconsIcon
                name="book-open-page-variant"
                style={styles.icon3}
            ></MaterialCommunityIconsIcon>
            </View>
        </View>
        <View style={styles.group}>
            <View style={styles.materialButtonSuccessStack}>
            <LeaderboardButton
                navigation={navigation}
                style={styles.materialButtonSuccess}
            ></LeaderboardButton>
            <MaterialCommunityIconsIcon
                name="chart-line-variant"
                style={styles.icon2}
            ></MaterialCommunityIconsIcon>
            </View>
        </View>
        <Image
            source={require("../assets/Bút_chì-01-removebg-preview1.png")}
            resizeMode="contain"
            style={styles.image}
        ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(41,182,246,1)"
  },
  triviasTime: {
    width: 316,
    height: 101,
    color: "rgba(179,229,252,1)",
    fontSize: 50,
    marginTop: 271,
    marginLeft: 35,
  },
  rect: {
    width: 225,
    height: 84,
    marginTop: 34,
    marginLeft: 75
  },
  materialButtonPink: {
    top: 0,
    left: 0,
    width: 225,
    height: 84,
    backgroundColor: "rgba(30,136,229,1)",
    position: "absolute",
    borderRadius: 27,
    borderColor: "#000000",
    borderWidth: 0
  },
  icon3: {
    top: 22,
    left: 31,
    position: "absolute",
    color: "rgba(144,202,249,1)",
    fontSize: 40
  },
  materialButtonPinkStack: {
    width: 225,
    height: 84
  },
  group: {
    width: 225,
    height: 84,
    marginTop: 24,
    alignSelf: "center"
  },
  materialButtonSuccess: {
    top: 0,
    left: 0,
    width: 225,
    height: 84,
    backgroundColor: "rgba(1,87,155,1)",
    position: "absolute",
    borderRadius: 27
  },
  icon2: {
    top: 24,
    left: 18,
    position: "absolute",
    color: "rgba(129,212,250,1)",
    fontSize: 40
  },
  materialButtonSuccessStack: {
    width: 225,
    height: 84
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -544,
    alignSelf: "center"
  }
});

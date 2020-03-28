import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
    const pressHandlerLeaderboard = () => {
        navigation.navigate('Leaderboard')
    }

    const pressHandlerGame = () => {
        navigation.navigate('Game')
    }

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title='go to leaderboard' onPress={pressHandlerLeaderboard} />
      <Button title='go to game' onPress={pressHandlerGame} />
    </View>
  );
}
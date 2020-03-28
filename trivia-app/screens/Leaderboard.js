import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Leaderboard({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('Home')
    }

    return (
    <View>
      <Text>Leaderboard Screen</Text>
      <Button title='go to home' onPress={pressHandler} />
    </View>
  );
}
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Lb from 'react-native-leaderboard';
import { db } from '../config/db';

let itemsRef = db.ref('/leaderboard');

export default function Leaderboard({ navigation }) {
  const data = [
        {userName: 'Joe', highScore: 52},
        {userName: 'Jenny', highScore: 120},
        //...
    ]; //can also be an object of objects!: data: {a:{}, b:{}}
    const pressHandler = () => {
        navigation.navigate('Home')
    }

    return (
    <View>
            <Leaderboard 
      data={data} 
      sortBy='highScore' 
      labelBy='userName'/>
      <Text>Leaderboard Screen</Text>
      <Button title='go to home' onPress={pressHandler} />
    </View>
  );
}
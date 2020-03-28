import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import Home from '../screens/HomeScreen';
import Leaderboard from '../screens/Leaderboard';
import Game from '../screens/GameScreen';

const screens = {
    Home: {
        screen: Home
    },
    Leaderboard: {
        screen: Leaderboard
    }
}

const MainStack = createStackNavigator(screens);

const GameStack = createStackNavigator(
    {
      Main: {
        screen: MainStack,
      },
      Game: {
        screen: Game,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );

export default createAppContainer(GameStack);
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/HomeScreen';
import Leaderboard from '../screens/Leaderboard';
import Game from '../screens/GameScreen';


const GameStack = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Game: {
            screen: Game,
        },
        Leaderboard: {
            screen: Leaderboard
        }
    },
    {
      headerMode: 'none',
    }
  );

export default createAppContainer(GameStack);
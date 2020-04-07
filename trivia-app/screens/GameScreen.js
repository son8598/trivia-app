// Game screen
// Swiping card design was built using this tutorial https://blog.expo.io/tutorial-tinder-ui-clone-18f72048d1a4
 

import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, AsyncStorage } from 'react-native';
import { db } from '../config/db';
import QuestionComponent from '../components/QuestionComponent';
import BackgroundImage from '../assets/quiz.jpg';
import * as Speech from 'expo-speech';
import ToggleVolume from '../components/ToggleVolume';
import EndGame from '../components/EndGame';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

// Connect to Firebase
const itemsRef = db.ref('/questions');

export default class Game extends React.Component {
  constructor() {
    super()

    this.position = new Animated.ValueXY()
    // Initialize state
    this.state = {
      currentIndex: 0,
      questions: [],
      userAnswer: 0,
      score: 0,
      isVoice: false,
      gameOver: false,
    }

    // Set up angles and stylings for swiping animation
     this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }

  // Set new state after each swipe
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, userAnswer: 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, userAnswer: 0 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  // Get questions data from Firebase and set to a state
  componentDidMount() {
    itemsRef.limitToLast(5).on('value', (snapshot) => {
        const data = snapshot.val();
        const questions = Object.values(data);
        this.setState({questions});
     });
  }

  // Update local storage to store records
  updateLeaderboard = async (score) => {
      const leaderboard = JSON.parse(await AsyncStorage.getItem('leaderboard'));
      leaderboard.push({timestamp: (new Date()).toLocaleDateString('en-US') ,score});
      await AsyncStorage.setItem('leaderboard',JSON.stringify(leaderboard));
  };

  // Decide what happens if a new state is formed
  componentDidUpdate(prevProps, prevState) {
    if(this.state.gameOver && !prevState.gameOver){
      this.updateLeaderboard(this.state.score); 
      if(this.state.isVoice){
        Speech.speak('Game over. You scored' + this.state.score + ' points');
      }
    }
    if(this.state.currentIndex != prevState.currentIndex){
      if(this.state.isVoice && this.state.currentIndex < this.state.questions.length){
        Speech.speak(this.state.questions[this.state.currentIndex].question);
      }
      if(this.state.currentIndex == this.state.questions.length){
        this.setState({ gameOver: true})
      }
      if(this.state.userAnswer == this.state.questions[prevState.currentIndex].answer){
        this.setState({ score: this.state.score + 1})
      }
    }
  }

  // Change state of the souding effect
  toggleVolume(){
    if(!this.state.isVoice && this.state.currentIndex < this.state.questions.length){
      Speech.speak(this.state.questions[this.state.currentIndex].question);
    }
    this.setState({ isVoice: !this.state.isVoice})
  }

  // Render the swiping cards and its content
  renderUsers = () => {
    return this.state.questions.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>TRUE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>FALSE</Text>
            </Animated.View>

            <Animated.View style={{ position: 'absolute', alignItems: 'center', top: 250, right: 70, left: 80, zIndex: 1000 }}>
                <QuestionComponent question={item.question} />
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={BackgroundImage} />
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View
            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>TRUE</Text>
            </Animated.View>
            
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>FALSE</Text>
            </Animated.View>

            <Animated.View style={{ position: 'absolute', alignItems: 'center', top: 250, right: 70, left: 80, zIndex: 1000 }}>
                <QuestionComponent question={this.state.questions[i].question} />
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={BackgroundImage} />
          </Animated.View>
        )
      }
    }).reverse()
  }

  // Render the whole game screen
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ height: 50 }}>
        </View>

        <View style={{ flex:0, flexDirection: 'row'}}>
          <View style={styles.volumeContainer}>
            <ToggleVolume volumeOn={this.state.isVoice} onPress={() => this.toggleVolume()} />
          </View>
          <View style={{ left: 190}}>
            <Text style={{ color: '#1e3799', fontSize: 22, fontWeight: '800', padding: 10, textAlign: 'right' }}>Score: {this.state.score}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <EndGame navigation={this.props.navigation} score={this.state.score} />
          {this.renderUsers()}
        </View>
        
        <View style={{ height: 60 }}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeContainer: {
    width: 56,
    height: 56,
    left: 20
  },
});

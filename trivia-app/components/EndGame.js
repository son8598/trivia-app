import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import EndGameButton from "./EndGameButton";

class EndGame extends Component {
  render() {
    return (
        <View style={styles.contentBox}>
            <Text style={styles.content}>GAME OVER!{"\n"}You scored {this.props.score} points.</Text>
            <EndGameButton goTo='Home' navigation={this.props.navigation} style={styles.goHomeButton} buttonName='Go Home' />
            <EndGameButton goTo='Leaderboard' navigation={this.props.navigation} style={styles.historyButton} buttonName='See Records' />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contentBox: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 350,
        height: 300,
        borderRadius: 15,
        backgroundColor: '#bdc3c7',
        top: 30
    },
    content: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    goHomeButton: {
        width: 160,
        height: 50,
        marginTop: 100,
        marginLeft: 100
    },
    historyButton: {
        width: 160,
        height: 50,
        marginTop: 20,
        marginLeft: 100
    },
});

export default EndGame;

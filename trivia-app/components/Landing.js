// Main code for the Records screen

import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';

export default class Landing extends React.Component {
  constructor() {
    super()

    this.state = {
      history: [],
    }
  }

  // Get data from local storage
  componentDidMount = async() => {
    const history = JSON.parse(await AsyncStorage.getItem('leaderboard'));
    this.setState({history: history});
  }

  // Display the most recent 10 records
  renderHistory = () => {
    return this.state.history.reverse().map((item, i) => {
      if(i < 10){
        return(
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>{item.score} pts - {item.timestamp}</Text>
          </View>
        );
      }
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <Text style={styles.headerText}>Records</Text>
        </View>
        <View style={{ height: 30 }}>
        </View>
        {this.renderHistory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    borderBottomColor: '#999999',
    borderBottomWidth: 0.3
  },
  headerText: {
    paddingTop: 30,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'AvenirNext-Medium',
    fontWeight: 'bold'
  },
  historyItem: {
    flex: 0.08,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 350,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#3498db',
  },
  historyText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
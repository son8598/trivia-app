import React, { Component } from 'react';
import {  View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    questiontext: {
        color: 'black', 
        fontSize: 30, 
        fontWeight: '500',
    }
});

export default class QuestionComponent extends Component {

  static propTypes = {
      question: PropTypes.string
  };

  render() {
    return (
      <View>
        <Text style={styles.questiontext}>{this.props.question}</Text>
      </View>
    );
  }
}
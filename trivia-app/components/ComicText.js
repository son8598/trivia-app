import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import * as Font from 'expo-font';

export default class ComicText extends Component {
    state = {
        fontLoaded: false
      };

    async componentDidMount() {
        await Font.loadAsync({
          Comic: require('../assets/fonts/comic-sans-ms-regular.ttf')
        });
        this.setState({
            fontLoaded: true
          });
    }
    render() {
        if(this.state.fontLoaded){
            return (
                    <Text style={[this.props.style, styles.font]}>{this.props.text}</Text>
            );
        }
        else{
            return null;
        }
    }
}

const styles = StyleSheet.create({
  font: {
      fontFamily: 'Comic',
  }
});
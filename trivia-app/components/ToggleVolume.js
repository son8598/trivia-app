import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ToggleVolume extends Component {
  render() {
    const iconName = this.props.volumeOn ? 'volume-high' : 'volume-off';
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Icon name={iconName} style={styles.icon}></Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 28,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center"
  }
});

export default ToggleVolume;

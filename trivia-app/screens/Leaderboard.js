import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { db } from '../config/db';
import Landing from '../components/Landing';

const itemsRef = db.ref('/leaderboard');

export default function Leaderboard({ navigation }) {
    return (
    <Landing />
  );
}
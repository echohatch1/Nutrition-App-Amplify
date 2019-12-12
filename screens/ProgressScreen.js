import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class ProgressScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.textStyle}>Coming Soon!</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: 'grey'
  }
})
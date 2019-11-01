import React from 'react'
import Expo from 'expo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  FlatList
} from 'react-native'
import {Container, Drawer, Header, Body, Left, Right,
  Button, Icon, Title, Footer, FooterTab, Content, Badge } from "native-base";


// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => console.log(user.attributes.email))
.catch(err => console.log(err));

export default class AddFoodScreen extends React.Component {


  render() {

    return (
      <Container>
      <Content>

          <Button onPress={() => this.props.navigation.navigate('FoodSearch')} placeholder='Rounded Textbox'><Text>Search</Text></Button>

      </Content>
    </Container>
    )
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5059ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#fff'
  }
})
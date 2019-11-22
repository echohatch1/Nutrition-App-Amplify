import React from 'react'
import Expo from 'expo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native'
import {Container, Drawer, Header, Body, Left, Right,
  Button, Icon, Title, Footer, FooterTab, Content, Badge, Item } from "native-base";


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
        <View>
          <Item style={{padding: 10}}>
          <TouchableOpacity style={styles.searchBox} onPress={() => this.props.navigation.navigate('FoodSearch')}>
                <Icon name="ios-search" />
                <Text>   Search</Text>
            </TouchableOpacity>
          </Item>
          </View>
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
  },
  searchBox: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
})
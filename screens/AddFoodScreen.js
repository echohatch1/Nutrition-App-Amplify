import React from 'react'
import Expo from 'expo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native'
import {Container, Drawer, Button, Icon, Title, Footer, FooterTab, Content, Badge, Item } from "native-base";
  import SegmentedControlTab from "react-native-segmented-control-tab";


// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => console.log(user.attributes.email))
.catch(err => console.log(err));



export default class AddFoodScreen extends React.Component {

  
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {
    

    return (
      <Container 
      style={styles.container}
      >

      <Content>
        <View>
          <Item style={{padding: 10}}>
          <TouchableOpacity style={styles.searchBox} onPress={() => this.props.navigation.navigate('FoodSearch')}>
                <Icon name="ios-search" />
                <Text>   Search</Text>
            </TouchableOpacity>
          </Item>
          <SegmentedControlTab
          values={["Recent", "Favorites"]}
          borderRadius={0}
          tabStyle={{height: 60, borderColor: "white"}}
          tabTextStyle={{color: "grey"}}
          activeTabTextStyle={{color: "grey"}}
          activeTabStyle={{backgroundColor: "white", borderBottomColor: "#ff7981", borderBottomWidth: 5}}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
          </View>
      </Content>
    </Container>
    )
    
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
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
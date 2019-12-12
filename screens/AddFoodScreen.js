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
import {Container, Drawer, Button, Icon, Title, Footer, FooterTab, Content, Badge, Item, Card, CardItem, Body } from "native-base";
  import SegmentedControlTab from "react-native-segmented-control-tab";


// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

let userEmail  = "";

Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => userEmail = user.attributes.email)
.catch(err => console.log(err));



export default class AddFoodScreen extends React.Component {

  
  constructor() {
    super();
    this.state = {
      dataSource: undefined,
      selectedIndex: 0,
      favorites: [],
      recents: [],
      showRecents: true,
      showFavorites: false,
      
    };
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
    this.setState(prevState => ({
      showRecents: !prevState.showRecents,
      showFavorites: !prevState.showFavorites
    }));
  };

  sortFood = function () {
    let favoriteArray = [];
    let recentArray = [];

    let myArray = this.state.dataSource;
    if (myArray.length > 0) {
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].favorite == true) {
            favoriteArray.push(myArray[i])
          }
          recentArray.push(myArray[i])

    }
    let recentArrayReverse = recentArray.reverse().slice(0, 4);
    this.setState({
      favorites: favoriteArray,
      recents: recentArrayReverse,
  })


  }
  
}

selectFood = (fdcid) => {
  this.props.navigation.navigate('FoodSelect', {fdcid: fdcid})
 }

fetchUserData = function () {
  fetch('https://nutuserscrud.herokuapp.com/users/email/' + userEmail, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          dataSource: responseJson.foods,
      })

      this.sortFood()

      console.log(this.state.favorites)
      //console.log(this.state.recents)

      })
      .catch((error) => {
        console.error(error);
      });
}

async componentWillMount() {

  this.fetchUserData()

  }

  render() {
    

    return (
      <Container 
      style={styles.container}
      >

      <Content>
        <View>

          <View style={{backgroundColor: "#32d998"}}>
          <TouchableOpacity style={styles.searchBox} onPress={() => this.props.navigation.navigate('FoodSearch')}>
                <Text>   Search</Text>
            </TouchableOpacity>
            </View>

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

          <View style={{padding: 10}}>

          {this.state.showRecents ? (
      <FlatList
        data={this.state.recents}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.fdcId)}
        style={{
          flexDirection: 'row',
           alignItems:'center',
           justifyContent:'space-between',
            padding: 15,
            marginTop: 5,
            marginBottom: 5,
           backgroundColor:'white',
           borderRadius: 20,
         }}
        >

        <Text>{item.name}</Text>
          <Icon name="add" style={{ fontSize: 30,}} />

      </TouchableOpacity>
      }
      
        keyExtractor={({uniqueId}, index) => uniqueId.toString()}
      /> ) : null}


{this.state.showFavorites ? (
<FlatList
        data={this.state.favorites}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.fdcId)}
        style={{
          flexDirection: 'row',
           alignItems:'center',
           justifyContent:'space-between',
            padding: 15,
            marginTop: 5,
            marginBottom: 5,
           backgroundColor:'white',
           borderRadius: 20,
         }}
        >

        <Text>{item.name}</Text>
          <Icon name="add" style={{ fontSize: 30,}} />

      </TouchableOpacity>
      }
      
        keyExtractor={({uniqueId}, index) => uniqueId.toString()}
      /> ) : null}




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
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
    borderRadius: 20,
    margin: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,

  },
})
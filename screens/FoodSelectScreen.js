import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Content, Card, CardItem, Body, Text, Form, Picker} from 'native-base';
import {
    
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
  } from 'react-native'
  //import { AppLoading } from "expo";
  //import * as Font from "expo-font";
  // AWS Amplify modular import
import Auth from '@aws-amplify/auth'

let userEmail  = "";

Auth.currentAuthenticatedUser({
  bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => userEmail = user.attributes.email)
.catch(err => console.log(err));

export default class FoodSelectScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
          fdcid: this.props.navigation.state.params.fdcid,
          dataSource: {},
          servings: undefined,
          meal: undefined,
          repeat: undefined,
          favorite: undefined,
        }
      }

      async componentWillMount() {

        fetch('https://api.nal.usda.gov/fdc/v1/' + this.state.fdcid + '?api_key=vnKItzFf17lhnUSV6R735i5ZOSRhordRwIXaWIHG', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },

          }).then((response) => response.json())
              .then((responseJson) => {
    
                this.setState({
                  dataSource: responseJson,

              })
              //console.log(this.state.fat)
              })
              .catch((error) => {
                console.error(error);
              });
        }

addFood() {

  fetch('https://nutuserscrud.herokuapp.com/users/email/' + userEmail, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "fdcId": this.state.fdcid,
       "name": this.state.dataSource.description,
        "servings": this.state.servings,
        "meal": this.state.meal,
        "repeat": this.state.repeat,
        "favorite": this.state.favorite
    }),
  }).then((response) => response.json())
      .then((responseJson) => {

        console.log("User data saved successfully")
      
      })
      .catch((error) => {
        console.error(error);
      });
}

onValueChangeServing(value) {
  this.setState({
    servings: value
  });
}
onValueChangeMeal(value) {
  this.setState({
    meal: value
  });
}
onValueChangeRepeat(value) {
  this.setState({
    repeat: value
  });
}
onValueChangeFavorite(value) {
  this.setState({
    favorite: value
  });
}
          


  render() {
      
    return (
      <Container>

<Content>

  <Card style={styles.card}>
  <Form>
  <CardItem header bordered>
  <Text style={{color: "black", fontWeight: "bold"}}>{this.state.dataSource.description}</Text>
            </CardItem>
  
<CardItem>
            
            <Item picker>
            <Text>Servings:</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder=""
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.servings}
                onValueChange={this.onValueChangeServing.bind(this)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </Item>
            </CardItem>
            <CardItem>

            <Item picker>
            <Text>Meal:</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder=""
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.meal}
                onValueChange={this.onValueChangeMeal.bind(this)}
              >
                <Picker.Item label="Breakfast" value="Breakfast" />
                <Picker.Item label="Lunch" value="Lunch" />
                <Picker.Item label="Dinner" value="Dinner" />
                <Picker.Item label="Snack" value="Snack" />
              </Picker>
            </Item>
            </CardItem>
            <CardItem>
            <Item picker>
            <Text>Repeat:</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder=""
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.repeat}
                onValueChange={this.onValueChangeRepeat.bind(this)}
              >
                <Picker.Item label="No" value="no" />
                <Picker.Item label="Yes" value="yes" />

              </Picker>
            </Item>
            </CardItem>
            <CardItem>
            <Item picker>
            <Text>Favorite:</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder=""
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.favorite}
                onValueChange={this.onValueChangeFavorite.bind(this)}
              >
                <Picker.Item label="No" value="no" />
                <Picker.Item label="Yes" value="yes" />
              </Picker>
            </Item>
            </CardItem>

            <CardItem>

            <TouchableOpacity
  onPress={() => this.addFood()}
   style={{
      flexDirection: 'row',
       alignItems:'center',
       justifyContent:'center',
       width: "100%",
        padding: 15,
        marginTop: 5,
        marginBottom: 5,
       backgroundColor:'#32d998',
       borderRadius:30,
     }}
 >
   <Text style={{color: 'white'}}>Add to Log</Text>
  </TouchableOpacity>
</CardItem>  

            </Form>
            </Card>


          

          <Card style={styles.card}>

            <CardItem header bordered>
              <Text style={{color: "black", fontWeight: "bold"}}>Nutrition Facts</Text>
            </CardItem>
      <FlatList
        data={this.state.dataSource.foodNutrients}
        renderItem={({item}) => <CardItem bordered>
        <Body>
          <Text>
          {item.nutrient.name}, {item.nutrient.rank} {item.nutrient.unitName}
          </Text>
        </Body>
      </CardItem>}
        keyExtractor={item => item.nutrient.id.toString()}
      />        
          </Card>
        

        </Content>


      </Container>
    );
  
  }
}

const styles = StyleSheet.create({
  button: {
    color: "white",
    backgroundColor: "blue",
    textAlign: "center"
  },
  searchBox: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonPadder: {
    padding: 10
  }
})
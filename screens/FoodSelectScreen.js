import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Content, Card, CardItem, Body, Text} from 'native-base';
import {
    
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
  } from 'react-native'
  //import { AppLoading } from "expo";
  //import * as Font from "expo-font";

export default class FoodSelectScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
          fdcid: this.props.navigation.state.params.fdcid,
          dataSource: {},
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

}
          


  render() {
      
    return (
      <Container>

<Content>

<View style={styles.buttonPadder}>
  <Button block onPress={() => this.addFood()}
            style={styles.button}>
              <Text>Add Food Item</Text>
            </Button>
</View>

          

          <Card style={styles.card}>
          <CardItem header>
          <Text>{this.state.dataSource.description}</Text>
            </CardItem>
            <CardItem header bordered>
              <Text>Nutrition Facts</Text>
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
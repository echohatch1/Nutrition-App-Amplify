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
          dataSource: "",
          text: "",
          fdcid: "566851",
          fat: "",
          saturatedFat: "",
          transFat: "",
          cholesterol: "",
          sodium: "",
          carbohydrates: "",
          fiber: "",
          protein: "",
          calcium: "",
          iron: "",
          calories: "",
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
                  fat: responseJson.labelNutrients.fat.value.toString(),
                  saturatedFat: responseJson.labelNutrients.saturatedFat.value.toString(),
                  transFat: responseJson.labelNutrients.transFat.value.toString(),
                  cholesterol: responseJson.labelNutrients.cholesterol.value.toString(),
                  sodium: responseJson.labelNutrients.sodium.value.toString(),
                  carbohydrates: responseJson.labelNutrients.carbohydrates.value.toString(),
                  fiber: responseJson.labelNutrients.fiber.value.toString(),
                  protein: responseJson.labelNutrients.protein.value.toString(),
                  calcium: responseJson.labelNutrients.calcium.value.toString(),
                  iron: responseJson.labelNutrients.iron.value.toString(),
                  calories: responseJson.labelNutrients.calories.value.toString(),
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

<View style={styles.searchHeader}>
<Button onPress={() => this.addFood()}
          style={styles.button}>
            <Text>Add Food Item</Text>
          </Button>
          </View>

          <Card>
            <CardItem header bordered>
              <Text>Nutrition Facts</Text>
            </CardItem>
      <CardItem bordered>
        <Body>
          <Text>
          Fat: {this.state.fat}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Saturated Fat: {this.state.saturatedFat}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Trans Fat: {this.state.transFat}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Cholesterol: {this.state.cholesterol}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Sodim: {this.state.sodium}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Carbohydrates: {this.state.carbohydrates}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Fiber: {this.state.fiber}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Protien: {this.state.protein}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Calcium: {this.state.calcium}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Iron: {this.state.iron}
          </Text>
        </Body>
      </CardItem>     
      <CardItem bordered>
        <Body>
          <Text>
          Calories: {this.state.calories}
          </Text>
        </Body>
      </CardItem>     
          </Card>


          <Card>
            <CardItem header bordered>
              <Text>Nutrients</Text>
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
        keyExtractor={({id}, index) => id.toString()}
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
    backgroundColor: "blue"
  },
  searchBox: {
    paddingLeft: 20,
    paddingRight: 20,
  }
})
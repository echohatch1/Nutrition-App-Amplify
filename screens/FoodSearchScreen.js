import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Content, Card, CardItem, Body, Text} from 'native-base';
import {
    
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    
  } from 'react-native'
  //import { AppLoading } from "expo";
 // import * as Font from "expo-font";

export default class FoodSearchScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
          dataSource: {},
          text: "",

        }
      }



 runSearch() {


      fetch('https://api.nal.usda.gov/fdc/v1/search?api_key=vnKItzFf17lhnUSV6R735i5ZOSRhordRwIXaWIHG', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "generalSearchInput": this.state.text,
          "pageNumber":"1",
        }),
      }).then((response) => response.json())
          .then((responseJson) => {

            this.setState({
              dataSource: responseJson,
              
          })
          
          })
          .catch((error) => {
            console.error(error);
          });
    }

   selectFood = (fdcid) => {
    this.props.navigation.navigate('FoodSelect', {fdcid: fdcid})
   }

  render() {

    return (
      <Container>
<Content>

<View style={styles.searchHeader}>
          <Item style={styles.searchBox}>
            <Icon name="ios-search" />
            <Input
            
            autoFocus
  onChangeText={(text) => this.setState({text})}
  value={this.state.text}/>
            <Icon name="pizza" />
          </Item>

          <View style={styles.buttonPadder}>
          <Button block onPress={() => this.runSearch()}
          style={styles.button}>
            <Text>Search</Text>
          </Button>
          </View>

          </View>

        <Card>
            <CardItem header bordered>
              <Text>Results</Text>
            </CardItem>
      <FlatList
        data={this.state.dataSource.foods}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.fdcId)}>
        <CardItem bordered>
          
        <Body>
          <Text>
          {item.description}, {item.brandOwner} {item.fdcId}
          </Text>
        </Body>

      </CardItem>
      </TouchableOpacity>
      }
      
        keyExtractor={({fdcId}, index) => fdcId.toString()}
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
  },
  buttonPadder: {
    padding: 10
  }
})
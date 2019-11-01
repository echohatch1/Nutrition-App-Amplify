import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import {
    Text,
    View,
    FlatList
  } from 'react-native'

export default class FoodSearchScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
          //isLoading: true,
          dataSource: "",
          text: "",
        }
      }

    runSearch() {
        return fetch('https://api.nal.usda.gov/ndb/search/?format=json&q=' + this.state.text + '&sort=r&max=25&offset=0&api_key=0vYyrRRYRLFRydJGAX6Pz84zcmWHePdo8sQDnc7V&ds=')
        .then((response) => response.json())
        .then((responseJson) => {
    
            this.setState({
              //isLoading: false,
              dataSource: responseJson.list,
            }, function(){
    
            });
    
    
        })
        .catch((error) =>{
          console.error(error);
        });
      }
  render() {
    return (
      <Container>

          <Item>
            <Icon name="ios-search" />
            <Input
  onChangeText={(text) => this.setState({text})}
  value={this.state.text}/>
            <Icon name="ios-people" />
          </Item>
          <Button  onPress={() => this.runSearch()}
          title="Search"
          color="#841584">
            <Text>Search</Text>
          </Button>

          <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource.item}
          renderItem={({item}) => <Text>{item.name}, {item.ndbno}</Text>}
          keyExtractor={({ndbno}, index) => ndbno}
        />
        </View>

      </Container>
    );
  }
}
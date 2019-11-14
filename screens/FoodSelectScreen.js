import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Content, Card, CardItem, Body, Text} from 'native-base';
import {
    
    View,
    FlatList,
    SafeAreaView,
    StyleSheet
  } from 'react-native'
  import { AppLoading } from "expo";
  import * as Font from "expo-font";

export default class FoodSelectScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
          //isLoading: true,
          dataSource: "",
          text: "",
          loading: true
        }
      }

      async componentWillMount() {
        await Font.loadAsync({
        Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
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
    
    if (this.state.loading) {
      return (
          <AppLoading />
      );
    }

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
            <Icon name="ios-people" />
          </Item>

          
          <Button onPress={() => this.runSearch()}
          style={styles.button}>
            <Text>Search</Text>
          </Button>

          </View>

        
        <Card>
            <CardItem header bordered>
              <Text>Results</Text>
            </CardItem>
      <FlatList
        data={this.state.dataSource.item}
        // renderItem={({item}) => <Text>{item.name}, {item.ndbno}</Text>}
        renderItem={({item}) => <CardItem bordered>
        <Body>
          <Text>
          {item.name}, {item.ndbno}
          </Text>
        </Body>
      </CardItem>}
        keyExtractor={({ndbno}, index) => ndbno}
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
import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Content, Card, CardItem, Body} from 'native-base';
import {
    
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text
  } from 'react-native'
  import { AppLoading } from "expo";
  import * as Font from "expo-font";

export default class FoodSearchScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
          dataSource: {},
          text: "",
          loading: true
        }
      }

      async componentWillMount() {
        // await Font.loadAsync({
        // Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
        // Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
        // });
        // this.setState({ loading: false });
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

   selectFood() {
    this.props.navigation.navigate('FoodSelect')
   } 

  render() {
    
    // if (this.state.loading) {
    //   return (
    //       <AppLoading />
    //   );
    // }

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
          <Button onPress={() => this.selectFood()}
          style={styles.button}>
            <Text>Food Details</Text>
          </Button>
          </View>

        <Card>
            <CardItem header bordered>
              <Text>Results</Text>
            </CardItem>
      <FlatList
        data={this.state.dataSource.foods}
        renderItem={({item}) => <CardItem bordered>
        <Body>
          <Text>
          {item.description}, {item.brandOwner} {item.fdcId}
          </Text>
        </Body>
      </CardItem>}
        keyExtractor={({fdcId}, index) => fdcId}
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
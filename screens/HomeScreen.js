import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList

} from 'react-native'
import { Container, Content, Accordion, Item, Button, Icon, Grid, Row, Col, Card, CardItem, Body } from "native-base";
import {
  PieChart,
} from "react-native-chart-kit";


// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

let userEmail  = "";

Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => userEmail = user.attributes.email)
.catch(err => console.log(err));




export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      dataSource: undefined,
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      timeStamp: new Date(),
      setDate: undefined,
      showBreakfast: false,
      showLunch: false,
      showDinner: false,
      showSnack: false,
      breakfastIcon: "add",
      lunchIcon: "add",
      dinnerIcon: "add",
      snackIcon: "add",
    }
  }

  ShowHideComponent = (meal) => {
    if (meal == "breakfast") {
      if (this.state.showBreakfast == true) {
        this.setState({
           showBreakfast: false,
           breakfastIcon: "add"
          });
      } else {
        this.setState({ 
          showBreakfast: true,
          breakfastIcon: "remove"
        });
      }
    }
    
    if (meal == "lunch") {
      if (this.state.showLunch == true) {
        this.setState({ 
          showLunch: false,
          lunchIcon: "add"
        });
      } else {
        this.setState({ 
          showLunch: true,
          lunchIcon: "remove"
        });
      }
    }
    if (meal == "dinner") {
      if (this.state.showDinner == true) {
        this.setState({ 
          showDinner: false,
          dinnerIcon: "add"
        });
      } else {
        this.setState({ 
          showDinner: true,
          dinnerIcon: "remove"
        });
      }
    }
    if (meal == "snack") {
      if (this.state.showSnack == true) {
        this.setState({ 
          showSnack: false,
          snackIcon: "add"
        });
      } else {
        this.setState({ 
          showSnack: true,
          snackIcon: "remove"
        });
      }
    }

  };

  addDays = function(days) {
    let result = this.state.timeStamp;
    result.setDate(result.getDate() + days);
    this.setState ({
      timeStamp: result
    })
    //console.log(this.state.timeStamp)
    let day = this.state.timeStamp.getDate()
    let month = this.state.timeStamp.getMonth() + 1;
    let year = this.state.timeStamp.getFullYear()
    let fullDate = month + '-' + day + '-' + year

    this.setState ({
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    })

    this.fetchUserData(fullDate)
    console.log(fullDate)
    //return result;
  }
  subtractDays = function(days) {
    let result = this.state.timeStamp;
    result.setDate(result.getDate() - days);
    this.setState ({
      timeStamp: result
    })
    //console.log(this.state.timeStamp)
    let day = this.state.timeStamp.getDate()
    let month = this.state.timeStamp.getMonth() + 1;
    let year = this.state.timeStamp.getFullYear()
    let fullDate = month + '-' + day + '-' + year

    this.setState ({
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    })

    this.fetchUserData(fullDate)
    console.log(fullDate)
    //return result;
  }

  sortFood = function () {
    let breakfastArray = [];
    let lunchArray = [];
    let dinnerArray = [];
    let snackArray = [];
    let myArray = this.state.dataSource;
    if (myArray.length > 0) {
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].meal == "breakfast" || myArray[i].meal == "Breakfast") {
            breakfastArray.push(myArray[i])
          } else if (myArray[i].meal == "lunch" || myArray[i].meal == "Lunch") {
            lunchArray.push(myArray[i])
          } else if (myArray[i].meal == "dinner" || myArray[i].meal == "Dinner") {
            dinnerArray.push(myArray[i])
          } else if (myArray[i].meal == "snack" || myArray[i].meal == "Snack") {
            snackArray.push(myArray[i])
          }
      }
      this.setState({
        breakfast: breakfastArray,
        lunch: lunchArray,
        dinner: dinnerArray,
        snack: snackArray,
    })
      //console.log(this.state.breakfast)
    }
  }

  fetchUserData = function (date) {
    fetch('https://nutuserscrud.herokuapp.com/users/foods/email/' + userEmail + '/date/' + date, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            dataSource: responseJson,
            setDate: date
        })
        //console.log(this.state.dataSource)
        this.sortFood()
        //console.log(date)
        })
        .catch((error) => {
          console.error(error);
        });
  }

  async componentWillMount() {

    let day = this.state.timeStamp.getDate()
    let month = this.state.timeStamp.getMonth() + 1;
    let year = this.state.timeStamp.getFullYear()
    let fullDate = month + '-' + day + '-' + year

    this.fetchUserData(fullDate)

    }

  render() {
    let dataArray = [
      { title: "Breakfast", content: this.state.breakfast.name },
      { title: "Lunch", content: this.state.lunch.name },
      { title: "Dinner", content: this.state.dinner.name },
      { title: "Snack", content: this.state.snack.name },
    ];

    return (
      <Container style={styles.containerStyle}>
        <Content>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: "white"}}>
          <TouchableOpacity onPress={() => {
          this.subtractDays(1)
        }}
        >
        <Icon name="arrow-back" style={{color: "grey"}}></Icon>
        </TouchableOpacity>

      <Text style={{fontSize: 18, fontWeight: "bold", color: "grey"}}>{this.state.setDate}</Text>

        <TouchableOpacity onPress={() => {
          this.addDays(1)
        }}
        >
        <Icon name="arrow-forward" style={{color: "grey"}}></Icon>
        </TouchableOpacity>
        </View>

<PieChart
  data={[
    {
      name: 'Fat',
      entres: 3,
      color: '#c4454d',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Calories',
      entres: 2,
      color: '#ea6068',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Protien',
      entres: 4,
      color: '#ff7981',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]}
  width={Dimensions.get('window').width}
  height={220}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  style={{
    marginVertical: 8,
    //borderRadius: 16,
  }}
  accessor="entres"
  backgroundColor="white"
  paddingLeft="15"
  absolute //for the absolute number remove if you want percentage
/>
        
          
        {/* <View style={{padding: 15}}>


            <Accordion
            dataArray={dataArray}
            icon="add"
            expandedIcon="remove"
            headerStyle={{ backgroundColor: "white", borderRadius: 20, marginTop: 15, padding: 15 }}
            contentStyle={{ borderRadius: 20 }}
          />




          </View> */}

<View style={{padding: 10}}>
<TouchableOpacity
        onPress={() => {
          this.ShowHideComponent('breakfast')
        }}
   style={{
      flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
        padding: 15,
       backgroundColor:'white',
       borderRadius:20,
     }}
 >
   <Text style={{}}>Breakfast</Text>
   <Icon name={this.state.breakfastIcon} style={{ fontSize: 30,}} />
  </TouchableOpacity>

  <Card transparent>
    {this.state.showBreakfast ? (
  <FlatList
        data={this.state.breakfast}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.uniqueId)}>
        <CardItem style={{backgroundColor: "transparent"}}>
          
        <Body>
          <Text>
          {item.name}
          </Text>
        </Body>

      </CardItem>
      </TouchableOpacity>
      }
      
        keyExtractor={({uniqueId}, index) => uniqueId.toString()}
      /> ) : null}
      </Card> 

  <TouchableOpacity
        onPress={() => {
          this.ShowHideComponent('lunch')
        }}
   style={{
      flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
        padding: 15,
       backgroundColor:'white',
       borderRadius:20,
     }}
 >
   <Text style={{}}>Lunch</Text>
   <Icon name={this.state.lunchIcon} style={{ fontSize: 30,}} />
  </TouchableOpacity>

  <Card transparent>{this.state.showLunch ? (
  <FlatList
        data={this.state.lunch}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.uniqueId)}>
        <CardItem style={{backgroundColor: "transparent"}}>
          
        <Body>
          <Text>
          {item.name}
          </Text>
        </Body>

      </CardItem>
      </TouchableOpacity>
      }
      
        keyExtractor={({uniqueId}, index) => uniqueId.toString()}
      /> ) : null}
      </Card> 

  <TouchableOpacity
        onPress={() => {
          this.ShowHideComponent('dinner')
        }}
   style={{
      flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
        padding: 15,
       backgroundColor:'white',
       borderRadius:20,
     }}
 >
   <Text style={{}}>Dinner</Text>
   <Icon name={this.state.dinnerIcon} style={{ fontSize: 30,}} />
  </TouchableOpacity>

     <Card transparent>{this.state.showDinner ? (
  <FlatList
        data={this.state.dinner}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.uniqueId)}>
        <CardItem style={{backgroundColor: "transparent"}}>
          
        <Body>
          <Text>
          {item.name}
          </Text>
        </Body>

      </CardItem>
      </TouchableOpacity>
      }
      
        keyExtractor={({uniqueId}, index) => uniqueId.toString()}
      /> ) : null}
      </Card> 

  <TouchableOpacity
        onPress={() => {
          this.ShowHideComponent('snack')
        }}
   style={{
      flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
        padding: 15,
       backgroundColor:'white',
       borderRadius:20,
     }}
 >
   <Text style={{}}>Snack</Text>
   <Icon name={this.state.snackIcon} style={{ fontSize: 30,}} />
  </TouchableOpacity>

  <Card transparent>{this.state.showSnack ? (
  <FlatList
        data={this.state.snack}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => this.selectFood(item.uniqueId)}>
        <CardItem style={{backgroundColor: "transparent"}}>
          
        <Body>
          <Text>
          {item.name}
          </Text>
        </Body>

      </CardItem>
      </TouchableOpacity>
      }
      
        keyExtractor={({uniqueId}, index) => uniqueId.toString()}
      /> ) : null}
      </Card> 

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
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  iconStyle: {
    color: '#32d998',
    fontSize: 70,
    alignSelf: "center"
  },
  containerStyle: {
    backgroundColor: "#e8e8e8"
  },
})
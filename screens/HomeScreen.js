import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,

} from 'react-native'
import { Container, Header, Content, Accordion, Item, Button, Icon, Grid, Row, Col } from "native-base";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Ionicons } from '@expo/vector-icons';


const dataArray = [
  { title: "Breakfast", content: "Lorem ipsum dolor sit amet" },
  { title: "Lunch", content: "Lorem ipsum dolor sit amet" },
  { title: "Snack", content: "Lorem ipsum dolor sit amet" },
  { title: "Dinner", content: "Lorem ipsum dolor sit amet" },
];
// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => console.log(user.attributes.email))
.catch(err => console.log(err));

export default class HomeScreen extends React.Component {
  render() {

    return (
      <Container>
<PieChart
  data={[
    {
      name: 'Breakfast',
      entres: 3,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Lunch',
      entres: 2,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Snack',
      entres: 4,
      color: '#f5b942',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Dinner',
      entres: 5,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]}
  width={Dimensions.get('window').width - 16}
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
    borderRadius: 16,
  }}
  accessor="entres"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute //for the absolute number remove if you want percentage
/>
        <Content padder>
          <Accordion dataArray={dataArray} icon="add" expandedIcon="remove" />
        </Content>

   

        <View style={{
 
        flexDirection: 'row',
        flexWrap: "nowrap",
        justifyContent: 'center',
        alignItems: 'flex-end',

      }}>
        <TouchableOpacity
        rounded
              style={{
                width: 70
              }}
                onPress={() => this.props.navigation.navigate('AddFood')}
                >
                
            <Ionicons name="ios-add-circle" style={styles.iconStyle} />
                    
        </TouchableOpacity>
        </View>

 


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
    color: '#b44666',
    fontSize: 70,
    alignSelf: "center"
  },
})
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native'
import { Container, Header, Content, Accordion } from "native-base";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const dataArray = [
  { title: "Breakfast", content: "Lorem ipsum dolor sit amet" },
  { title: "Lunch", content: "Lorem ipsum dolor sit amet" },
  { title: "Snack", content: "Lorem ipsum dolor sit amet" },
  { title: "Dinner", content: "Lorem ipsum dolor sit amet" },
];


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
  }
})
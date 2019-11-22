import { AppLoading } from 'expo';
// import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
//import { Font } from "expo";
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import { Icon, Root } from 'native-base'
// Amplify imports and config
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)


//import AppNavigator from './navigation/AppNavigator';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import AuthLoadingScreen from './screens/AuthLoadingScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import SignInScreen from './screens/SignInScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'

// App stack screen imports
import HomeScreen from './screens/HomeScreen';
import MealsScreen from './screens/MealsScreen'
import MoodScreen from './screens/MoodScreen'
import SettingsScreen from './screens/SettingsScreen';
import ProgressScreen from './screens/ProgressScreen';
import AddFoodScreen from './screens/AddFoodScreen'
import FoodSearchScreen from './screens/FoodSearchScreen'
import FoodSelectScreen from './screens/FoodSelectScreen'

const actions = [
  {
    text: "Accessibility",
    icon: <Icon name="ios-add-circle" />,
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Language",
    icon: <Icon name="ios-add-circle" />,
    name: "bt_language",
    position: 1
  },
  {
    text: "Location",
    icon: <Icon name="ios-add-circle" />,
    name: "bt_room",
    position: 3
  },
  {
    text: "Video",
    icon: <Icon name="ios-add-circle" />,
    name: "bt_videocam",
    position: 4
  }
];


// App tabs located at the bottom of the screen
const AppTabNavigator = createBottomTabNavigator({
  'My Food': {
    screen: HomeScreen,
  },
  'My Progress': {
    screen: ProgressScreen
  },
  AddButton: {
		screen: () => null,
		navigationOptions: () => ({
			tabBarIcon: (<ActionButton/>),
			tabBarOnPress: () => {}
		})
	},
  'Meal Plan': {
    screen: MealsScreen
  },
  'My Mood': {
    screen: MoodScreen
  }
  
}, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'My Food') {
        iconName = "clipboard";
      } else if (routeName === 'My Progress') {
        iconName = "trending-down";
      } else if (routeName === 'Meal Plan') {
        iconName = "basket";
      } else if (routeName === 'My Mood') {
        iconName = "happy";
      }
      return <Icon name={iconName} style={{color: tintColor, fontSize: 30}} />
    },
  }),
  tabBarOptions: {
    activeTintColor: '#ff7981',
    inactiveTintColor: 'gray',
    showLabel: false,
    style: {height: 75}
  },

}
)

// Making the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }) => {

  let { routeName } =   navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  

  return {
    headerTitle,
  }
}

const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator,

    // Set the header icon
    navigationOptions: ({navigation}) => ({

            headerStyle: {
                backgroundColor: '#32d998'
            },
      
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Icon name='md-menu' size={24} style={{color:"white"}}/>
          </View>
        </TouchableOpacity>
      ),

      headerTitleStyle: {
        textAlign: 'center',
        flexGrow:1,
        alignSelf:'center',
        color: "white",
    },

      headerRight: (
        <View></View>
      ),

      // headerRight: () => (
      //   <TouchableOpacity
      //     onPress={() => alert('This is a button!')}
      //     title="Info"
      //     color="black"
      //   >
      //     <View style={{paddingHorizontal: 10}}>
      //       <Text>Check</Text>
      //   </View>
      //   </TouchableOpacity>
      // ),
    })
  },
  //add routes not in a navigator
  AddFood: {
    screen: AddFoodScreen,
    navigationOptions: () => ({
      title: `Add Food`, // for the header screen
      headerBackTitle: 'Back',
    }),
  },
  Profile: { 
    screen: SettingsScreen,
    navigationOptions: () => ({
      title: `Profile`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  FoodSearch: {
    screen: FoodSearchScreen,
    navigationOptions: () => ({
      title: `Food Search`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  FoodSelect: {
    screen: FoodSelectScreen,
    navigationOptions: () => ({
      title: `Food Select`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
})

// App stack for the drawer
const AppDrawerNavigator = createDrawerNavigator({
  Menu: AppStackNavigator,
  Profile: SettingsScreen
})

// Auth stack
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to this App`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
})


const AppNavigator = createSwitchNavigator({
  
  // screen: name
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator, // Auth stack
  App: AppDrawerNavigator, // the App stack
})

const AppContainer = createAppContainer(AppNavigator);

class ActionButton extends React.Component {
  render() {
    return (

      <TouchableOpacity
      rounded
            style={{
              width: 70
            }}
              onPress={() => alert("You clicked the add button")}
              >
              
          <Icon name="ios-add-circle" style={styles.iconStyle} />
                  
      </TouchableOpacity>

    );
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
    Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
    }

  render() {
      if (this.state.loading) {
        return (
            <AppLoading />
        );
    }
    return (
  
    <AppContainer />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#32d998',
    fontSize: 70,
    alignSelf: "center"
  },
})

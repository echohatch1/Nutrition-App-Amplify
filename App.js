// import { AppLoading } from 'expo';
// import { Asset } from 'expo-asset';
// import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'native-base'
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


// App tabs located at the bottom of the screen
const AppTabNavigator = createBottomTabNavigator({
  Food: {
    screen: HomeScreen
  },
  Progress: {
    screen: ProgressScreen
  },
  Meals: {
    screen: MealsScreen
  },
  Mood: {
    screen: MoodScreen
  },
})

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
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Icon name='md-menu' size={24}/>
          </View>
        </TouchableOpacity>
      )
    })
  }
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

//food stack
// const FoodStackNavigator = createStackNavigator({
//   Food: {
//     screen: Food
//   },
//   AddFood: {
//     screen: AddFoodScreen,
//   },
  
// })

const App = createSwitchNavigator({
  // screen: name
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator, // Auth stack
  App: AppDrawerNavigator, // the App stack
  //Food: FoodStackNavigator, //food stack
})

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

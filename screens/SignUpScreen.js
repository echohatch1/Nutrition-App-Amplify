import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Modal,
  FlatList,
  Animated,
  } from 'react-native'
  import {
    Container,
    Item,
    Input,
    Icon
  } from 'native-base'
  // Load the app logo
const logo = require('../assets/images/logo.png')

  export default class SignUpScreen extends React.Component {
    state = {
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      authCode: '',
      fadeIn: new Animated.Value(0),  // Initial value for opacity: 0
      fadeOut: new Animated.Value(1),  // Initial value for opacity: 1
      isHidden: false
    }

    componentDidMount() {
      this.fadeIn()
    }
    fadeIn() {
      Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
      ).start()
      this.setState({isHidden: true})
    }
    fadeOut() {
      Animated.timing(
      this.state.fadeOut,
      {
        toValue: 0, // 1 in the SignInScreen component
        duration: 700,
        useNativeDriver: true
      }
      ).start()
      this.setState({isHidden: false})
    }

    onChangeText(key, value) {
      this.setState({[key]: value})
    }

    render() {
      let { fadeOut, fadeIn, isHidden } = this.state
      return (
        <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior='padding' 
          enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* App Logo */}
  <View style={styles.logoContainer}>
    {
      isHidden ?
      <Animated.Image 
        source={logo} 
        style={{ opacity: fadeIn, width: 110.46, height: 117 }}
      />
      :
      <Animated.Image 
        source={logo} 
        style={{ opacity: fadeOut, width: 110.46, height: 117 }}
      />
    }
  </View>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* username section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='person'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                      onChangeText={value => this.onChangeText('username', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/*  password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      // ref={c => this.SecondInput = c}
                      ref='SecondInput'
                      onSubmitEditing={(event) => {this.refs.ThirdInput._root.focus()}}
                      onChangeText={value => this.onChangeText('password', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* email section */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='mail'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Email'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref='ThirdInput'
                      onSubmitEditing={(event) => {this.refs.FourthInput._root.focus()}}
                      onChangeText={value => this.onChangeText('email', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* phone section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='call'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='+44766554433'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'phone-pad'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref='FourthInput'
                      value={this.state.phoneNumber}
                      onChangeText={(val) => this.onChangeText('phoneNumber', val)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* End of phone input */}
                  <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  {/* code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='md-apps'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Confirmation code'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'numeric'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value => this.onChangeText('authCode', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Confirm Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Resend code
                    </Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#aa73b7',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    input: {
      flex: 1,
      fontSize: 17,
      fontWeight: 'bold',
      color: '#5a52a5',
    },
    infoContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 200,
      bottom: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
      backgroundColor: '#aa73b7',
    },
    itemStyle: {
      marginBottom: 20,
    },
    iconStyle: {
      color: '#5a52a5',
      fontSize: 28,
      marginLeft: 15
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#667292',
      padding: 14,
      marginBottom: 20,
      borderRadius: 24,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#fff",
    },
    logoContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 400,
      bottom: 180,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
  })
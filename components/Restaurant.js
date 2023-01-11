import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import AddMenu from './AddMenu';
import RestaurantSignup from './RestaurantSignup'

export default function Restaurant({ navigation }) {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  function handleChange(text, eventName) {
    // console.log(values)
    setValues(prev => {
      return {
        ...prev,
        [eventName]: text
      }
    })
  }


  const sign = () => {
    navigation.navigate("RestaurantSignup");

  }
  function login() {
    const { email, password } = values;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigation.replace("AddMenu")
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (

    <View styles={styles.container}>

      <ImageBackground source={require('../assets/food6.jpg')} style={{ width: '100%', height: '100%' }}>

        <View style={styles.view1}>
          <Text style={styles.labal3}>
            Login
          </Text>
          <Text style={styles.label1}>Email </Text>
          <TextInput style={styles.input} placeholder="Enter email" onChangeText={text => handleChange(text, "email")} />
          <Text style={styles.label1}>Password </Text>
          <TextInput style={styles.input} placeholder="Enter password" secureTextEntry={true} onChangeText={text => handleChange(text, "password")}  />
          <TouchableOpacity  onPress={() => login()} style={{
            backgroundColor: 'olivedrab',
            borderRadius: 30,
            height: 50,
            width: 200,
            borderWidth: 1,
            marginTop: 20,
            marginLeft: 75,
            color: 'white',
            textAlign: "center"
          }} >
            <Text style={{ color: 'white', fontSize: 20, textAlign: "center", paddingTop: 7 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ fontSize: 29, marginTop: 30, fontWeight: 'bold', textAlign: 'center', color: 'red', fontFamily: 'serif' }}>
            OR
          </Text>
          <TouchableOpacity onPress={sign}>

            <Text style={styles.labal2}>
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>


    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: "center",
    backgroundColor: 'black',

  },
  view1: {
    marginTop: 110,
    marginLeft: 30,
    alignContent: "center",
  },

  labal2: {
    fontSize: 29,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ADFF2F',
    fontFamily: 'serif'

  },
  labal3: {
    fontSize: 39,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
    fontFamily: 'serif',
    marginLeft:-10

  },

  input: {
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "darkgrey",
    color: "white",
    fontSize: 15,

  },
  label1: {
    marginTop: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'white'
  },

});
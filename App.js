import React,{useState} from 'react';
import { Text, View, StyleSheet ,Image } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Customer from './components/Customer';
import Menu from './components/Menu';
import CustomerSignup from './components/CustomerSignup';
import AddMenu from './components/AddMenu';
import RestaurantSignup from './components/RestaurantSignup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen'
import ResultsShowScreen from './screens/ResultsShowScreen'
import CustomerMenuList from './components/CustomerMenuList'
import CheckOut from './components/CheckOut'
import MenuList from './components/MenuList';
import AppDrawer from './screens/AppDrawer';
import ProfileUpdate from './screens/profileUpdate'

const Stack = createNativeStackNavigator();
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

  const[isLoggedIn,setIsLoggedIn] = useState(false);

  const firebaseConfig = {


      apiKey: "AIzaSyA1Xsna0HSL3y01wg0x5d8CIGrkPwAjs0A",
      authDomain: "restaurant-3d25f.firebaseapp.com",
      projectId: "restaurant-3d25f",
      storageBucket: "restaurant-3d25f.appspot.com",
      messagingSenderId: "448807509069",
      appId: "1:448807509069:web:fc5a6d731a34aa2b199004"




  };

    firebase.initializeApp(firebaseConfig);

  // else {
  //     firebase.app();
  // }

  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }

  });

  return (

    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Restaurant" component={Restaurant}/>
        <Stack.Screen name="Customer" component={Customer}/>
       {/* <Stack.Screen name ="Menu" component={Menu}/> */}
       <Stack.Screen name ="CustomerSignup" component={CustomerSignup}/>
       <Stack.Screen name ="AddMenu" component={AddMenu}/>
       <Stack.Screen name ="RestaurantSignup" component={RestaurantSignup}/>
       <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }} />
       <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
       <Stack.Screen name="MenuList" component={MenuList} />
       <Stack.Screen name='CheckOut' component={CheckOut} />
       <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

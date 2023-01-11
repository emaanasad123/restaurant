import React, { useEffect, useState } from 'react';
import { Text, Alert,View, StyleSheet, Image, Dimensions,StatusBar,TextInput, TouchableOpacity,
   ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import MenuList from './MenuList';
export default function AddMenu({ navigation }) {
  // const { userid} = route.params.userid;
  // console.log(userid)
  const [image, setImage] = useState("");
   const [itemname , setitemname] = useState("");
   const [itemprice , setitemprice] = useState("");
   const [cars, setCars] = useState([]);
   const [menu,setmenu] = useState([]);

   const clearAsyncStorage = async() => {
    navigation.navigate("MenuList")
}
React.useEffect(() => {
    
  async function getDataFromStorage() {
    try {
      let value = await AsyncStorage.getItem('menu');
      if (value !== null) {
        value = await JSON.parse(value);
        setmenu(value);
      }
    } catch (error) {
      alert(error);
    }
  }
  getDataFromStorage();
}, []);

const addCar = async () => {
  try {
    let previousArray = [];
    const value = await AsyncStorage.getItem('menu');
    if (value !== null) {
      previousArray = JSON.parse(value);
    }
    const newArray = [
      ...previousArray,
      {
        image:image,
        name:itemname,
        price:itemprice,
        key: Math.random(),
      },
    ];
    await AsyncStorage.setItem('menu', JSON.stringify(newArray));
    navigation.navigate('MenuList', { reFetch: true });
  } catch (error) {
    alert(error);
  }
  setImage("");
  setitemprice("");
  setitemname("");
};


return(

  <View style={styles.container}>
      <ImageBackground source={require('../assets/food6.jpg')} style={{ width: '100%', height: '100%' }}>
      <TouchableOpacity style={{ backgroundColor: 'olivedrab',
          borderRadius: 10,
          height:50,
          width:130,
          borderWidth: 1,
          marginTop:20,
          marginLeft:240,
          color:'white',
          textAlign:"center",
          justifyContent:"center"
          }} onPress={clearAsyncStorage} >
          <Text style={{color:'white' , fontSize:20 ,textAlign:"center" ,justifyContent:"center" }}>
                View Items
          </Text>
        </TouchableOpacity>
     <Text style={styles.labal2}>
            Add menu items
     </Text>
     <Text style={styles.label1}>Item Name </Text>
     <TextInput style={styles.input}   placeholder="Enter name"  value={itemname} onChangeText={setitemname}/>
     <Text style={styles.label1}>Item Price </Text>
     <TextInput style={styles.input}   placeholder="Enter Price"  keyboardType="numeric" value={itemprice} onChangeText={setitemprice} />
     <Text style={styles.label1}>Item Picture URL </Text>
     <TextInput style={styles.input}   placeholder="Type Photo URL"  value={image} onChangeText={setImage} />
       <TouchableOpacity style={{backgroundColor: image && itemname
        && itemprice ? 'olivedrab' : 'gray',
          borderRadius: 30,
          height:50,
          width:130,
          borderWidth: 1,
          marginTop:40,
          marginLeft:130,
          color:'white',
          textAlign:"center",
          justifyContent:"center"
          }}onPress={()=>{
            addCar();
            alert('You Added a new Item!!');
          }}disabled={
            image && itemname
        && itemprice?false:true

          }  >
          <Text style={{color:'white' , fontSize:20 ,textAlign:"center" ,justifyContent:"center" }}>
                Add Item
          </Text>
        </TouchableOpacity>
        </ImageBackground>

  </View>
);

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign:"center",
    backgroundColor: 'black',
    
  },
  view1:{
  marginTop:20,
  marginLeft:30,
  marginRight:150,
  backgroundColor:"grey",
  height:70,
  
  },
  
   labal2: { 
    fontSize: 29, 
    marginTop:70,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'yellow',
    fontFamily:'serif',

  },
  logo: {
  
  
    height:40,
    width:70,
    
  },
   labal3: { 
    marginTop:25,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color:'white',

  },
  
  input: {
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor:"darkgrey",
    color:"white",
    fontSize:15,
    marginTop:5,
    
  },
   label1: {
     marginTop:10,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color:'white'
  },

});
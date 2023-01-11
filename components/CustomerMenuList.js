import React, { useEffect, useState } from 'react';
import { Text, Alert,View, StyleSheet, Image, Dimensions,StatusBar,TextInput,ScrollView, TouchableOpacity,
   ImageBackground, Button,  } from 'react-native';

   import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerMenuList ({navigation , route}){
    const [image, setImage] = useState(null);
    const [itemname , setitemname] = useState(null);
    const [itemprice , setitemprice] = useState(null);
    const [menu , setmenu] = useState([]);
    const [reload, setReload] = useState(false);
    const [order, setorder] = useState([]);
    async function show(){
        try {
            var value = await AsyncStorage.getItem('menu');
            
            if (value !== null) {
           
              value = await JSON.parse(value);
              //alert("kkkname" +value.itemname+"lllprice"+value.itemprice);
              console.log(value);
              setmenu(value);
            }
          } catch (error) {
            alert(error);
          }
    }
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
      setReload(false);
    }
    if (route.params?.reload || reload) {
      getDataFromStorage();
    }

    useEffect(() => {
      getDataFromStorage()

      }, [route.params, reload]);
    
      const addcart = async (key,price,image,name,) => {
        
            try {
                let previousArray = [];
                const value = await AsyncStorage.getItem('order');
                if (value !== null) {
                  previousArray = JSON.parse(value);
                }
                const newArray = [
                  ...previousArray,
                  {
                    name,
                    price,
                    image,
                    key
                  },
                ];
              await AsyncStorage.setItem('order', JSON.stringify(newArray));
              // alert("Item Added to cart");
              navigation.navigate('CheckOut', { reFetch: true });

            } catch (error) {
              alert(error);
            }
            
        
      };
    const scrollView = (
        <View style={{ flex: 1, padding: 0, width: '100%', marginRight: 5 }}>
          <ScrollView
            style={{
              width: '100%',
              margin: 3,
            }}>
            {menu.map((car, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                style={{ width: '96%', marginLeft:4, marginBottom:4 }}>
                <View style={styles.scrollviewlistItem}>
                <Image
                style={{ width: 100, height: 100, borderRadius: 20 }}
                source={{ uri: car.image }}></Image>


                  <Text
                    style={styles.cardText}>
                        
                    {car.name}
                   
                  </Text>
                  <Text
                    style={styles.cardText1}>
                        Rs.
                    {car.price}
                  </Text>
    
                  <TouchableOpacity onPress={() => addcart(car.key , car.price,car.image,car.name)}>
                    <Image style={{width: 40,height: 30 , borderRadius:15}} source={require("../assets/cart.png")}/>
                    </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
      const emptyScrollView = (
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'grey' }}>
            
          </Text>
        </View>
      );
      return (
        <View style={styles.scrollViewContainer}>
            <ImageBackground source={require('../assets/food6.jpg')} style={{height:'100%' , width:'100%'  }}>
          <Text style={styles.title}>Menu </Text>
          {menu.length <= 0 ? emptyScrollView : scrollView}

        </ImageBackground>
        </View>
        
      );
    };
    const styles = StyleSheet.create({
        title: {
            fontSize: 34,
            //fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            padding: 15,
            color:"yellow",
            marginTop:70
          },

        scrollviewlistItem: {
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'black',
            alignSelf: 'center',
            padding: 5,
            margin: 5,
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height:100
          },
          cardText: {
            //paddingLeft: 12,
            fontSize: 23,
            textAlign: 'center',
            color: 'white',
          },
          cardText1: {
            //paddingLeft: 12,
            fontSize: 14,
            textAlign: 'center',
            justifyContent:"center",
            color: 'white',
            marginTop:7
          },
          crossOuter: {
            width: 30,
            backgroundColor: 'red',
            textAlign: 'center',
            borderRadius: 20,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          },
          crossText: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
          },
          scrollViewContainer: {
            flex: 1,
            backgroundColor: 'white',
          },
    })



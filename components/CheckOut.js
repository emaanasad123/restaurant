import React, { useEffect, useState } from 'react';
import { Text, Alert,View, StyleSheet, Image, Dimensions,StatusBar,TextInput,ScrollView, TouchableOpacity,
   ImageBackground, Button,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckOut ({navigation , route}){
    const [image, setImage] = useState(null);
    const [itemname , setitemname] = useState(null);
    const [itemprice , setitemprice] = useState(null);
    const [menu , setmenu] = useState([]);
    const [reload, setReload] = useState(false);
    const [cars, setCars] = useState([]);
    const [order, setorder] = useState([]);
    const [price,setprice] = useState();
    async function show(){
        try {
            var value = await AsyncStorage.getItem('order');
            
            if (value !== null) {
           
              value = await JSON.parse(value);
              //alert("kkkname" +value.itemname+"lllprice"+value.itemprice);
              console.log(value);
              setorder(value);
            }
          } catch (error) {
            alert(error);
          }
    }
    async function getDataFromStorage() {
      try {
        let value = await AsyncStorage.getItem('order');
        if (value !== null) {
          value = await JSON.parse(value);
          setorder(value);
          //total price
          const arr = order.filter((item)=>item.itemprice);
          arr.map((item)=>{
            setprice(item.itemprice);

          })

          
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
    
      const deleteCar = async (key) => {
        const updatedArray = order.filter((carItem) => carItem.key !== key);
        try {
          await AsyncStorage.setItem('order', JSON.stringify(updatedArray));
        } catch (error) {
          alert(error);
        }
        setReload(true);
      };
    const scrollView = (
        <View style={{ flex: 1, padding: 0, width: '100%', marginRight: 5 }}>
          <ScrollView
            style={{
              width: '100%',
              margin: 3,
            }}>
            {order.map((car, i) => (
              <TouchableOpacity
                
                activeOpacity={0.7}
                //onPress={() =>
                  //navigation.navigate('dish Details', {
                   //image: menu.image,
                   //name:menu.itemname,
                   //price :menu.itemprice
                  //})
                //}
                style={{ width: '100%' }}>
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
    
                  <TouchableOpacity onPress={() => deleteCar(car.key)}>
                    <View style={styles.crossOuter}>
                      <Text style={styles.crossText}>X</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
      const emptyScrollView = (
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Text style={{ fontSize: 35, fontStyle: 'italic', color: 'grey' }}>
            No items in cart :(
          </Text>
        </View>
      );
      return (
        <View style={styles.scrollViewContainer}>
            <ImageBackground source={require('../assets/food6.jpg')} style={{height:'100%' , width:'100%'  }}>
          <Text style={styles.title}>Orders</Text>
          {order.length <= 0 ? emptyScrollView : scrollView}

          {/* <TouchableOpacity style={{ backgroundColor: 'olivedrab',
         borderRadius: 30,
         height:50,
         width:120,
         borderWidth: 1,
         marginTop:20,
         marginLeft:120,
         color:'white',
         textAlign:"center",
         justifyContent:"center"
          }} onPress={show} >
          <Text style={{color:'white' , fontSize:23 ,textAlign:"center" ,justifyContent:"center" }}>
                View Cart
          </Text>
        </TouchableOpacity> */}
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



// import  React,{useState} from 'react';
// import { Text, View, StyleSheet, Image ,TextInput,TouchableOpacity, ScrollView,FlatList} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Constants from 'expo-constants';
// import { restaurantsData } from './Data';
// import FoodCard from './FoodCard';
// import { colors,parameters } from './global/styles';
// const SCREEN_WIDTH = Dimensions.get('window').width

// export default function Menu({navigation}) {
//   const [p,setp] = useState("");
//   const [n,setn] = useState("");
//   const [i,seti]= useState("");

//   /*getitemstorage = async (key) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         // We have data!!
//         return(value)
        
//       }
//     } catch (error) {
//       console.log("read data error")
//     }
//   };

//   readstorage=()=>{
//     this.getitemstorage("i").then(result=>{
//       let jsonObject= JSON.parse(result)
//       alert("name:" +jsonObject.item.n + "price: "+ jsonObject.item.p)
      
//       //seti(jsonObject.item.i);
//     })
//   }*/

// return(
// <ScrollView>
//   <View style={{backgroundColor:"white"}}>
//       <FlatList 
//                style ={{marginTop:10, marginBottom:10}} 
//                horizontal ={true}
//                data = {restaurantsData}
//                keyExtractor = {(item,index)=>index.toString()}   
//                showsHorizontalScrollIndicator = {false}
//                renderItem = {({item})=>(
//                    <View style ={{marginRight:5}}>
//                        <FoodCard 
//                            screenWidth  ={SCREEN_WIDTH*0.8}
//                            images ={item.images}
//                            restaurantName ={item.restaurantName}
//                            farAway ={item.farAway}
//                            businessAddress ={item.businessAddress}
//                            averageReview ={item.averageReview}
//                            numberOfReview ={item.numberOfReview}
                           
//                        />
//                    </View>
//                )}  
//             />
//       <View style ={styles.headerTextView}>
//             <Text style ={styles.headerText}>Promotions available</Text>
//         </View>

//         <View>
//             <FlatList 
//                style ={{marginTop:10, marginBottom:10}} 
//                horizontal ={true}
//                data = {restaurantsData}
//                keyExtractor = {(item,index)=>index.toString()}   
//                showsHorizontalScrollIndicator = {false}
//                renderItem = {({item})=>(
//                    <View style ={{marginRight:5}}>
//                        <FoodCard 
//                            screenWidth  ={SCREEN_WIDTH*0.8}
//                            images ={item.images}
//                            restaurantName ={item.restaurantName}
//                            farAway ={item.farAway}
//                            businessAddress ={item.businessAddress}
//                            averageReview ={item.averageReview}
//                            numberOfReview ={item.numberOfReview}
                           
//                        />
//                    </View>
//                )}  
//             />
//         </View>
//         <View style ={styles.headerTextView}>
//             <Text style ={styles.headerText}>Restaurants in your Area</Text>
//         </View>

//         <View style ={{width:SCREEN_WIDTH,paddingTop:10}}>
//         { 
//             restaurantsData.map(item =>(
//                 <View key ={item.id} style = {{paddingBottom:20}}>
//                 <FoodCard 
//                            screenWidth  ={SCREEN_WIDTH*0.95}
//                            images ={item.images}
//                            restaurantName ={item.restaurantName}
//                            farAway ={item.farAway}
//                            businessAddress ={item.businessAddress}
//                            averageReview ={item.averageReview}
//                            numberOfReview ={item.numberOfReview}
                           
//                        />
//                 </View>
//             )
//             )
//         }  
//         </View>

//   </View>
//   </ScrollView>
// );


// }

// const styles = StyleSheet.create({

//   container:{
//       flex:1,
//       paddingTop:20
    
     
//   },
//   deliveryButton:{
//       paddingHorizontal:20,
//        borderRadius:15,
//        paddingVertical:5
//   },

//   deliveryText:{
//       marginLeft:5,
//       fontSize:16
//   },

//   filterView:{flexDirection:"row" ,
//                alignItems:"center", 
//                justifyContent:"space-evenly",
//                marginHorizontal:10,
//                marginVertical:10
//               },

//   clockView:{flexDirection:"row",
//               alignItems:'center',
//               marginLeft:20,
//               backgroundColor:colors.cardbackground,
//               borderRadius:15,
//               paddingHorizontal:5,
//               marginRight:20
//            },
//   addressView:{flexDirection:"row",
//                backgroundColor:colors.grey5,
//                borderRadius:15,
//                paddingVertical:3,
//                justifyContent:"space-between",
//                paddingHorizontal:20
//               },

//   headerText:{
//       color:colors.grey2,
//       fontSize:24,
//       fontWeight:"bold",
//       paddingLeft:10,
//   },
//   headerTextView:{
//       backgroundColor:colors.grey5,
//       paddingVertical:3,
//   },

//   smallCard :{
//       borderRadius:30,
//       backgroundColor:colors.grey5,
//       justifyContent:"center",
//       alignItems:'center',
//       padding:5,
//       width:80,
//       margin:10,
//       height:100
//   },

//   smallCardSelected:{
//       borderRadius:30,
//       backgroundColor:colors.buttons,
//       justifyContent:"center",
//       alignItems:'center',
//       padding:5,
//       width:80,
//       margin:10,
//       height:100
//   },

//   smallCardTextSected :{
//       fontWeight:"bold",
//       color:colors.cardbackground
//   },

//   smallCardText :{
//       fontWeight:"bold",
//       color:colors.grey2
//   },

//   floatButton:{
//       position:'absolute',
//       bottom:10,right:15,
//       backgroundColor:'white',
//       elevation:10,
//       width:60,height:60,
//       borderRadius:30,
//       alignItems:'center'
//   }


// })
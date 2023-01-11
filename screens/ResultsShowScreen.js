import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({route, navigation }) => {
  const [result, setResult] = useState(null);
  const {id} = route.params;

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <ImageBackground source={require('../assets/food6.jpg')} style={{height:'100%' , width:'100%'  }}>
      <View style={styles.container}>
      <Text style={styles.header}>{result.name}</Text>
      <Text style={styles.content}>City: {result.location.city}</Text>
      <Text style={styles.content}>Address: {result.location.address1}</Text> 
      <Text style={styles.content}>Phone: {result.phone}</Text>
      <Text style={styles.content}>Rating: {result.rating}</Text>
      <Text style={styles.content}>Reviews: {result.review_count}</Text>
      {/* <Text style={{fontWeight:'bold'}}>{result.country}</Text> */}
      <Text style={styles.headerBottom}>Gallery</Text>
      <FlatList
         horizontal={true}
         showsHorizontalScrollIndicator={false}
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />;
        }}
      />
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    marginTop:100,
    marginLeft:10
  },
  header: {
    fontSize:35,
    fontWeight:'bold',
    color:'yellow',
    marginLeft:20
  },
  headerBottom: {
    fontSize:30,
    fontWeight:'bold',
    color:'yellow',
    marginLeft:20,
    marginTop:40
  },
  content: {
    fontWeight:'bold',
    color:'white',
    fontSize:20,
    fontStyle:'italic',
    marginLeft:40,
    marginTop:20

  },
  imageStyle: {
    height: 200,
    width: 300,
    margin:5
  },
});

export default ResultsShowScreen;

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";


function SearchScreen({ navigation, route }) {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();
  // console.log(results);

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <View> 
      <ImageBackground source={require('../assets/food6.jpg')} style={{ height: '100%', width: '100%' }}>
        {/* <Drawer.Navigator  initialRouteName="Restaurant">
        <Drawer.Screen name="Restaurant" component={Restaurant} />
        <Drawer.Screen name="Customer" component={Customer} />
        </Drawer.Navigator> */}
        {/* <AppDrawer/> */}
        <SearchBar
          term={term}
          onTermChange={(newTerm) => setTerm(newTerm)}
          onTermSubmit={() => searchApi(term)}
        />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <ScrollView>
        <ResultsList results={filterResultsByPrice("$$")} navigation={navigation} title="Best Market" />
        <ResultsList
            results={filterResultsByPrice("$")}
            navigation={navigation}
            title="Most Popular"
          />
          <ResultsList results={filterResultsByPrice("$$")} navigation={navigation} title="Highly Rated" />
          <ResultsList
            results={filterResultsByPrice("$")}
            navigation={navigation}
            title="Best choice"
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
});
export default SearchScreen;

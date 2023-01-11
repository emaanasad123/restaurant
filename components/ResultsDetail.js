import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={result.image_url ? { uri: result.image_url } : null}
      />
      <Text style={styles.nameStyle}>{result.name}</Text>
      <Text style={styles.Itemstyle}>
        {result.rating} Stars, {result.review_count} Reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  imageStyle: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  Itemstyle: {
    color:'white'
  },
  nameStyle: {
    fontWeight: "bold",
    color:'white'
  },
});

export default ResultsDetail;

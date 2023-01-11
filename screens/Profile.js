import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchScreen from "./SearchScreen";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { Ionicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ route, navigation }) => {

    const { email } = route.params;
    const uemail = JSON.stringify(email)
    const uEmail = uemail.slice(1, -1)

    const [image, setImage] = useState(null);

    const [sName, setsName] = useState("");
    const [sEmail, setsEmail] = useState("");
    const [sPhone, setsPhone] = useState("");
    const [sAddress, setsAddress] = useState(""); 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    };

    const getdata = () => {


        firebase.firestore().collection('Customers').where('email', '==', uEmail)
            .get().then(function (querySnapshot) {
                if (querySnapshot.size > 0) {
                    setsName(querySnapshot.docs[0].data().name)
                    setsEmail(querySnapshot.docs[0].data().email)
                    setsPhone(querySnapshot.docs[0].data().phone)
                    setsAddress(querySnapshot.docs[0].data().address)
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document: ", error);
            });
    }
    useEffect(() => {
        getdata()
    }, [getdata]);


    return (
        <View style={{ backgroundColor: "#F8F8FF" }}>
             <ImageBackground source={require('../assets/food6.jpg')} style={{height:'100%' , width:'100%'  }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.header}>Profile Details</Text>
                    <TouchableOpacity 
                    style={{ marginLeft: 120, marginTop: 90, flexDirection: 'row' }}
                    onPress={()=>navigation.navigate("ProfileUpdate",{Uemail:email})}
                    >
                        <FontAwesome name="pencil" size={20} color="white" />
                        <Text style={{ fontWeight: "bold", marginLeft: 4, color:'white' }}>EDIT</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ borderWidth: 2, borderRadius: 20 }}>
                    <TouchableOpacity style={{
                        borderRadius: 30,
                        height: 90,
                        width: 90,
                        borderWidth: 1,
                        marginTop: 10,
                        marginLeft: 120,
                        marginBottom: 20,
                        color: 'white',
                        textAlign: "center",
                        
                    }} onPress={pickImage} >
                        <Image style={styles.logo} source={require('../assets/user.png')} />
                    </TouchableOpacity>
                    <View style={styles.data}>
                        <FontAwesome name="user" size={20} color="white" />
                        <Text style={styles.left}>Name</Text>
                        <TouchableOpacity><Text style={styles.right}>{sName}</Text></TouchableOpacity>
                    </View>
                    <View style={styles.data}>
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text style={styles.left}>Email</Text>
                        <Text style={styles.right}>{sEmail}</Text>
                    </View>
                    <View style={styles.data}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={styles.left}>Phone</Text>
                        <Text style={styles.right}>{sPhone}</Text>
                    </View>
                    <View style={styles.data}>
                        <FontAwesome name="map-marker" size={20} color="white" />
                        <Text style={styles.left}>Address</Text>
                        <Text style={{marginLeft:90,color:'white',fontSize:18}}>{sAddress}</Text>
                    </View>
                </View>
                <Text style={styles.headerBottom}>General</Text>
                <View style={styles.data}>
                    <FontAwesome name="star" size={20} color="white" />
                    <TouchableOpacity><Text style={styles.left}>Rate this app</Text></TouchableOpacity>
                </View>
                <View style={{ marginLeft: 100, marginTop: 10 }}>
                    <TouchableOpacity><Text style={{ fontWeight: "bold", color:'white' }}>Terms and conditions</Text></TouchableOpacity>
                    <Text style={{ marginLeft: 30,color:'white' }}>Version 1.0.0</Text>
                </View>
            </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    data: {
        marginTop: 20,
        marginLeft: 30,
        marginBottom: 20,
        flexDirection: "row"
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 80,
        color:'yellow'
    },
    headerBottom: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 5,
        color:'white'

    },
    left: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 15,
        color:'white',
        fontSize:20
    },
    right: {
        marginLeft: 100,
        color:'white',
        fontSize:18
    },
    logo: {
        height: 90,
        width: 90,
        borderRadius:50

    },

});

export default Profile;



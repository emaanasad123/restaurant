import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { Ionicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from "react-native-gesture-handler";

const ProfileUpdate = ({ route, navigation }) => {

    const { Uemail } = route.params;
    const uemail = JSON.stringify(Uemail)
    const uEmail = uemail.slice(1, -1)

    // const [image, setImage] = useState(null);

    // const [name, setsName] = useState("");
    const [email, setsEmail] = useState(uEmail);
    // const [phone, setsPhone] = useState("");
    // const [address, setsAddress] = useState("");

    const [values, setValues] = useState({
        name: "",
        phone: "",
        address: "",
        email: uEmail
      });

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      };


    function handleChange(text, eventName) {
        // console.log(values)
        setValues(prev => {
          return {
            ...prev,
            [eventName]: text
          }
        })
      }

    const updatedata = () => {
        const { name, phone, address, email} = values;
        firebase.firestore().collection('Customers').doc(uEmail).update({ 
            name: name,
            phone:phone,
            address:address
        },{ merge: true });
        alert("Record updated!")
        navigation.navigate("Profile",{email:email})
    }

    return (
        <View style={{ backgroundColor: "#F8F8FF" }}>
        <ImageBackground source={require('../assets/food6.jpg')} style={{height:'100%' , width:'100%'  }}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.header}>Profile Details</Text>
                <TouchableOpacity onPress={()=>updatedata()} style={{marginLeft:120,marginTop:90, flexDirection:'row'}}>
                <FontAwesome name="save" size={20} color="white" />
                <Text style={{ fontWeight:"bold", marginLeft:4, color:"white"}}>Save</Text>
                </TouchableOpacity>
                </View>

                <View style={{ borderWidth: 2, borderRadius: 20 }}>
                <TouchableOpacity style={{
                            borderRadius: 30,
                            height: 90,
                            width: 90,
                            borderWidth: 1,
                            marginTop:10,
                            marginLeft: 120,
                            marginBottom:20,
                            color: 'white',
                            textAlign: "center" 
                        }} onPress={pickImage} >
                            <Image style={styles.logo} source={require('../assets/user.png')} />
                        </TouchableOpacity>
                        <View style={styles.data}>
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text style={styles.left}>Email</Text>
                        <TextInput editable={false}  style={styles.right} >{email}</TextInput>
                    </View>
                    <View style={styles.data}>
                        <FontAwesome name="user" size={20} color="white" />
                        <Text style={styles.left}>Name</Text>
                        <TextInput  style={styles.right} onChangeText={text => handleChange(text, "name")} placeholder="New name" ></TextInput>
                    </View>
                    <View style={styles.data}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={styles.left}>Phone</Text>
                        <TextInput  style={styles.right} onChangeText={text => handleChange(text, "phone")} placeholder="New phone no." ></TextInput>
                    </View>
                    <View style={styles.data}>
                        <FontAwesome name="map-marker" size={20} color="white" />
                        <Text style={styles.left}>Adress</Text>
                        <TextInput  style={styles.right} onChangeText={text => handleChange(text, "address")} placeholder="New address" ></TextInput>
                    </View>
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

    left: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 15,
        color:'white',
        fontSize:20
    },
    right: {
        marginLeft: 20,
        borderWidth:2,
        borderRadius:20,
        height:40,
        width:200,
        alignItems:'center',
        paddingLeft:10,
        color:'grey',
        backgroundColor:'white'
    },
    logo: {
        height:90,
        width:90,
        borderRadius:50
        
      },

});

export default ProfileUpdate;



import React from "react";
import { View, Text } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Profile from "./Profile";
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from "./SearchScreen";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import CustomerMenuList from "../components/CustomerMenuList";

const Drawer = createDrawerNavigator();

const Logout = ({ navigation }) => {
    firebase.auth().signOut().then(() => console.log('User signed out!'));
    navigation.navigate("Home");
    return (
        <View>
            <Text>You're logged out</Text>
        </View>
    );
}


export default function AppDrawer({ route }) {

    const { email } = route.params;
    // alert(JSON.stringify(email))
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: 'white',
                    width: 280,
                },
                drawerActiveTintColor: 'black',
                drawerInactiveTintColor: 'black',
                drawerType: 'slide',
                headerStyle: {
                    //   backgroundColor: '#F5DFF5',
                },
                headerTintColor: 'black',
            }} initialRouteName="Restaurants">

            <Drawer.Screen
                name="Profile"
                component={Profile}
                initialParams={{ email: email }}
                options={{
                    drawerLabel: "Profile",
                    drawerIcon: () => <AntDesign name="user" size={20} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Restaurants"
                component={SearchScreen}
                options={{
                    drawerLabel: 'Restaurants',
                    drawerIcon: () => <MaterialIcons name="restaurant" size={20} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Menu" 
                component={CustomerMenuList}
                options={{
                    drawerLabel: 'Menu',
                    drawerIcon: () => <MaterialIcons name="menu" size={20} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={Logout}
                options={{
                    drawerLabel: 'Logout',
                    drawerIcon: () => (
                        <MaterialIcons name="logout" size={20} color="black" />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
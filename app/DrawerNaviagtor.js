import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

import Home from "./components/Home";
import LoginActivity from "./components/LoginActivity";
import { useLogin } from "./context/LoginProvider";
import { logout } from "./utils/auth";
import { navigateToLogin } from "./utils/methods";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    const { setIsLoggedIn, profile, setProfile, setLoading } = useLogin();

    const handleLogout = async () => {
        setLoading(true);
        const isLoggedOut = await logout()
        if(isLoggedOut) {
            setLoading(false);
            setProfile({});
            setIsLoggedIn(false);
        } else {
            setLoading(false);
            console.log("something went wrong");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 20,
                        backgroundColor: "#f6f6f6",
                        marginBottom: 20,
                    }}
                >
                    <View>
                        <Text>{profile.fullname}</Text>
                        <Text>{profile.email}</Text>
                    </View>
                    <Image
                        source={{
                            uri:
                                profile.avatar ||
                                "https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 50,
                    backgroundColor: "#f6f6f6",
                    padding: 20,
                }}
                onPress={handleLogout}
            >
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "transparent",
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitle: "",
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen component={Home} name="Home" />
            <Drawer.Screen component={LoginActivity} name="Login Activity" />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

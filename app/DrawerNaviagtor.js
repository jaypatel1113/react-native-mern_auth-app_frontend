import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

import { useLogin } from "./context/LoginProvider";
import { logout } from "./utils/auth";

import Home from "./screens/Home";
import LoginActivity from "./screens/LoginActivity";
import CreatedAt from "./screens/CreatedAt";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    const { setIsLoggedIn, profile, setProfile, setLoading } = useLogin();

    const handleLogout = async () => {
        setLoading(true);
        const isLoggedOut = await logout();
        if (isLoggedOut) {
            setProfile({});
            setIsLoggedIn(false);
            setLoading(false);
        } else {
            console.log("something went wrong");
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: "#aaa",
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
                                "https://static.thenounproject.com/png/363640-200.png",
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
                    backgroundColor: "#ddd",
                    marginHorizontal: 15,
                    borderRadius: 30,
                    padding: 20,
                }}
                onPress={handleLogout}
            >
                <Text
                    style={{
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    LOG OUT
                </Text>
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
            <Drawer.Screen component={CreatedAt} name="Details" />
            <Drawer.Screen component={LoginActivity} name="Login Activity" />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import { useLogin } from "../context/LoginProvider";

import Item from "../components/Item";

const LoginActivity = () => {
    const { profile, isLoggedIn } = useLogin();
    // const ms = profile.tokens;
    // console.log(ms);

    const renderItem = ({ item }) => <Item time={item.signedAt} />;

    return isLoggedIn ? (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Currently Logged in: {isLoggedIn ? profile?.tokens?.length : 0} Devices
            </Text>
            <FlatList
                data={profile.tokens}
                renderItem={renderItem}
                keyExtractor={(item) => item.token}
            />
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 20,
    },
});

export default LoginActivity;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLogin } from "../context/LoginProvider";
import Item from "./Item";

const Home = () => {
    // const { profile, isLoggedIn } = useLogin();
    // console.log(profile.tokens[0].signedAt);
    // console.log("here")
    // try {
    //     var datetime = isLoggedIn ? profile?.tokens[0]?.signedAt : "1234567890"
    // } catch(error) {
    //     console.log(error);
    // }
    // const signupTime = parseInt(datetime);
    
    // console.log(ms);

    return (
        // isLoggedIn?
        // <View style={styles.container}>
        //     <Text style={styles.subhead}>Account was created on: </Text>
        //     <View>
        //         <Item time={signupTime} />
        //     </View>
        // </View> : null
        <View style={styles.container}>
            <Text style={styles.subhead}>Hello world!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        marginTop: 10,
        alignItems: "center",
        paddingHorizontal: 40,
    },
    subhead: {
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 20,
    },
    date: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 10,
        fontWeight: "bold",
        color: "#222",
    },
});

export default Home;

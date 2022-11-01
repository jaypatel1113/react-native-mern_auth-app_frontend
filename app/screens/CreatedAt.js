import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";

import { useLogin } from "../context/LoginProvider";

import Item from "../components/Item";

const CreatedAt = () => {
    const { profile, isLoggedIn } = useLogin();
    // console.log(profile);
    // console.log("here")
    try {
        var datetime = isLoggedIn ? profile?.tokens[0]?.signedAt : "1234567890";
    } catch (error) {
        console.log(error);
    }
    const signupTime = parseInt(datetime);

    // console.log(signupTime);

    return isLoggedIn ? (
        <View style={styles.container}>
            <Text style={styles.subhead}>Details: </Text>
            <View style={styles.marbtm}>
                <View style={styles.pic}>
                    <Image
                        source={{
                            uri:
                                profile.avatar ||
                                "https://static.thenounproject.com/png/363640-200.png",
                        }}
                        style={{ width: 100, height: 100, borderRadius: 30 }}
                    />
                </View>
                <View style={[styles.cont, styles.back]}>
                    <Text style={styles.subText}>ID</Text>
                    <Text style={styles.subText}>{profile._id}</Text>
                </View>
                <View style={[styles.cont, styles.back]}>
                    <Text style={styles.subText}>Full Name</Text>
                    <Text style={styles.subText}>{profile.fullname}</Text>
                </View>
                <View style={[styles.cont, styles.back]}>
                    <Text style={styles.subText}>Email</Text>
                    <Text style={styles.subText}>{profile.email}</Text>
                </View>
                <View style={[styles.cont, styles.back]}>
                    <Text style={styles.subText}>Account Verification</Text>
                    <Text style={styles.subText}>
                        {profile.verified ? "Successfull" : "Unsuccessfull"}
                    </Text>
                </View>
            </View>
            <Text style={styles.subhead}>Account was created on: </Text>
            <View>
                <Item time={signupTime} />
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // marginTop: 10,
        alignItems: "center",
        paddingHorizontal: 40,
    },
    pic: {
        alignSelf: "center",
        marginBottom: 10,
    },
    cont: {
        width: Dimensions.get("window").width - 100,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    marbtm: {
        marginBottom: 40,
    },
    back: {
        padding: 15,
        marginHorizontal: 30,
        paddingHorizontal: 40,
        width: Dimensions.get("window").width - 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        marginVertical: 10,
        borderRadius: 25,
    },
    subText: {
        fontSize: 14,
        fontWeight: "500",
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

export default CreatedAt;

import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const Heading = ({ title }) => {
    return (
        <View style={styles.cont}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    cont: {
        borderTopWidth: 1,
        width: Dimensions.get("window").width - 40,
        marginTop: 15,
    },
    text: {
        fontSize: 28,
        marginTop: 15,
        color: "rgba(25,39,52,1)",
        fontWeight: "900",
        textAlign: "center",
    },
});

export default Heading;

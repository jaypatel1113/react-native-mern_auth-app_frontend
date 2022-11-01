import React from "react";
import { View, StyleSheet, Text } from "react-native";

const FormHeader = ({ leftHeading, rightHeading, subHeading }) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={[styles.heading]}>{leftHeading}</Text>
                <Text style={styles.heading}>{rightHeading}</Text>
            </View>
            <Text style={styles.subHeading}>{subHeading}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: { 
        fontSize: 30, 
        fontWeight: "bold", 
        color: "#1b1b33" 
    },
    subHeading: { 
        fontSize: 18, 
        color: "#1b1b33", 
        textAlign: "center" 
    },
});

export default FormHeader;

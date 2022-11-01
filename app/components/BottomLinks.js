import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const BottomLinks = ({ leftPress, rightPress, leftText, rightText }) => {
    return (
        <View style={styles.linkCont}>
            <TouchableOpacity onPress={leftPress}>
                <Text style={styles.linkText}>{leftText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={rightPress}>
                <Text style={styles.linkText}>{rightText}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    linkCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        // paddingVertical: 10
    },
    linkText: {
        fontSize: 13,
        color: "#fff",
        color: "rgba(25,39,52,1)",
        paddingVertical: 10,
        // paddingHorizontal: 15,
        borderRadius: 8,
    },
});

export default BottomLinks;
import { Animated, StyleSheet, Text } from "react-native";
import React, { useEffect, useRef } from "react";

const AppNotification = ({ type, text }) => {
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(height, {
            toValue: 40,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    const backgroundColor = type === "error" ? "rgba(255, 0, 0, 0.7)" : "rgba(0, 255, 0, 0.7)";
    const color = type === "error" ? "#fff" : "#000";

    return (
        <Animated.View style={[styles.container, { height, backgroundColor }]}>
            <Text style={[styles.txtsty, { color }]}>{text}</Text>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    txtsty: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
});

export default AppNotification;

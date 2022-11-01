import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const FormSubmitButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
        >
            <Text style={{ fontSize: 18, color: "#fff" }}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(25,39,52,1)",
    },
});

export default FormSubmitButton;

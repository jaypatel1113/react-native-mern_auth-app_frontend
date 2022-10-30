import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView
            enabled
            showsVerticalScrollIndicator={false}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView>
                <View>{children}</View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
    },
});

export default FormContainer;

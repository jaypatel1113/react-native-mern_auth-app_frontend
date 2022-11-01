import { StyleSheet, View } from "react-native";
import React from "react";

import LottieView from "lottie-react-native";

const AppLoader = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView
                source={require("../../assets/loading.json")}
                autoPlay
                loop
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 1,
    },
});

export default AppLoader;

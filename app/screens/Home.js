import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.subhead}>Hello world!</Text>
            <View style={styles.details}>
                <Text style={[styles.subhead, styles.mainHead]}>Languages Used:</Text>
                <Text style={[styles.subhead, styles.newHead]}>React Native</Text>
                <Text style={[styles.subhead, styles.newHead]}>React JS</Text>
                <Text style={[styles.subhead, styles.newHead]}>Node JS</Text>
                <Text style={[styles.subhead, styles.newHead]}>Express JS</Text>
                <Text style={[styles.subhead, styles.newHead]}>Mongo DB</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        alignItems: "center",
        paddingHorizontal: 40,
    },
    mainHead: {
        marginBottom: 40,
        fontSize: 20,
    },
    newHead: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 10,
    },
    details: {
        marginTop: 50,
        backgroundColor: '#eee',
        padding: 20,
        paddingHorizontal: 40,
        borderRadius: 15
    },
    subhead: {
        fontSize: 28,
        fontWeight: "500",
        marginBottom: 20,
    },
});

export default Home;

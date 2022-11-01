import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const Item = ({ time }) => {
    const formatedate = (ms) => {
        const intMs = parseInt(ms);
        // console.log(ms);
        const date = new Date(intMs);

        // formatting date and time
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var formatedTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

        const formatedDate = date.toDateString() + ", " + formatedTime;
        return formatedDate;
    };

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{formatedate(time)}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    item: {
        padding: 15,
        marginHorizontal: 30,
        width: Dimensions.get("window").width - 40 - 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        marginVertical: 10,
        borderRadius: 25,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        fontWeight: "500",
    },
});

export default Item;

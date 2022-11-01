import React from "react";
import { StyleSheet, View } from "react-native";

import FormHeader from "./FormHeader";

const AppForm = ({ login }) => {
    return (
        <View style={{ paddingTop: 120 }}>
            <View style={{ height: 80 }}>
                <FormHeader
                    leftHeading="Welcome"
                    rightHeading={login ? null : " Back"}
                    subHeading="Task Manager"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});

export default AppForm;
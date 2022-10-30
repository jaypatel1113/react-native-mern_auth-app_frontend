import React from "react";
import { StyleSheet, View } from "react-native";

import FormHeader from "./FormHeader";

export default function AppForm() {
    return (
        <View style={{ paddingTop: 120 }}>
            <View style={{ height: 80 }}>
                <FormHeader
                    leftHeading="Welcome "
                    rightHeading="Back"
                    subHeading="Task Manager"
                />
            </View>

            {/* <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <LoginForm navigation={navigation} />
                <ScrollView>
                    <SignupForm navigation={navigation} />
                </ScrollView>
                <ForgetPassword navigation={navigation} />
            </ScrollView> */}
        </View>
    );
}

const styles = StyleSheet.create({});

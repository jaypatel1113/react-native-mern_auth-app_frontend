import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import {
    isValidEmail,
    isValidObjField,
    navigateToLogin,
    navigateToRegister,
    updateError,
} from "../utils/methods";
import { forgetpass } from "../utils/auth";
import { useLogin } from "../context/LoginProvider";

import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import BottomLinks from "../components/BottomLinks";
import Heading from "../components/Heading";
import AppForm from "../components/AppForm";
import AppNotification from "../components/AppNotification";

const ForgetPassword = ({ navigation }) => {
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const { setLoading } = useLogin();
    const [userInfo, setUserInfo] = useState({
        email: "",
    });
    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };
    const isValidForm = () => {
        if (!isValidObjField(userInfo))
            return updateError("Enter Email!", setText, "error", setType);

        if (!isValidEmail(userInfo.email))
            return updateError("Invalid Email!", setText, "error", setType);

        return true;
    };

    const submitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                const res = await forgetpass(userInfo);

                // console.log(res);
                if (!res.success) {
                    setLoading(false);
                    return updateError(res.message, setText, "error", setType);
                }

                if (res.success) {
                    setUserInfo({ email: "" });
                    updateError(res.message, setText, "success", setType);
                    setTimeout(() => {
                        navigateToLogin(navigation);
                    }, 2500);
                }

                setLoading(false);
                // console.log(res);
            } catch (error) {
                // console.log(error);
                setLoading(false);
                updateError(error.message, setText, "error", setType);
            }
        }
    };

    return (
        <>
            <AppForm />
            <FormContainer>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Heading title="Forget your Password?" />
                </View>
                {text ? <AppNotification type={type} text={text} /> : null}
                <FormInput
                    value={userInfo.email}
                    onChangeText={(value) => handleOnChangeText(value, "email")}
                    label="Email"
                    placeholder="example@email.com"
                    autoCapitalize="none"
                />

                <FormSubmitButton onPress={submitForm} title="Send Link" />
                <BottomLinks
                    leftPress={() => navigateToLogin(navigation)}
                    rightPress={() => navigateToRegister(navigation)}
                    leftText={"Sign IN"}
                    rightText="Sign UP"
                />
            </FormContainer>
        </>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({});

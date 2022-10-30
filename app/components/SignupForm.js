import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import client from "../api/client";
import {
    isValidEmail,
    isValidObjField,
    navigateToForgetPassword,
    navigateToLogin,
    updateError,
} from "../utils/methods";
import { StackActions } from "@react-navigation/native";
import AppForm from "./AppForm";
import BottomLinks from "./BottomLinks";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import Heading from "./Heading";
import { signInWithAsync, signup } from "../utils/auth";
import AppNotification from "./AppNotification";
import { useLogin } from "../context/LoginProvider";

const SignupForm = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({
        fullname: "jay patel",
        email: "jay734883@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
    });

    const [type, setType] = useState('');
    const [text, setText] = useState('');
    const {setLoading} = useLogin();
    // const [msg, setMsg] = useState({type: '', text: ''});

    const { fullname, email, password, confirmPassword } = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };

    const isValidForm = () => {
        // we will accept only if all of the fields have value
        if (!isValidObjField(userInfo))
            return updateError("Fill all fields!", setText, "error", setType);
        // if valid name with 3 or more characters
        if (!fullname.trim() || fullname.length < 3)
            return updateError("Invalid name!", setText, "error", setType);
        // only valid email id is allowed
        if (!isValidEmail(email))
            return updateError("Invalid email!", setText, "error", setType);
        // password must have 8 or more characters
        if (!password.trim() || password.length < 8)
            return updateError("Password is less then 8 characters!", setText, "error", setType);
        // password and confirm password must be the same
        if (password !== confirmPassword)
            return updateError("Password does not match!", setText, "error", setType);

        return true;
    };

    const sumbitForm = async () => {
        if (isValidForm()) {
            setLoading(true);
            // submit form
            const result = await signup(userInfo);
            if(!result.success) {
                setLoading(false);
                return updateError(result.message, setText, "error", setType);
            }
            // if(!result.success) return setMsg({type: 'error', text: result.message})
            
            if (result.success) {
                setLoading(true);
                const signInRes = await signInWithAsync(userInfo.email, userInfo.password)
                if (signInRes.success) {
                    setLoading(false);
                    navigation.dispatch(
                        // StackActions.replace("ImageUpload", {
                            //     token: signInRes.data.token,
                            // })
                            StackActions.replace("Verification", {profile: result.newUser})
                            );
                        }
                    }
                }
                setLoading(false);
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
                    <Heading title="Register" />
                </View>
                {/* {error ? (
                    <Text
                        style={{
                            color: "red",
                            fontSize: 18,
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </Text>
                ) : null} */}
                {text ? <AppNotification type={type} text={text} /> : null}
                <FormInput
                    value={fullname}
                    onChangeText={(value) =>
                        handleOnChangeText(value, "fullname")
                    }
                    label="Full Name"
                    placeholder="John Doew"
                    autoCapitalize="none"
                />
                <FormInput
                    value={email}
                    onChangeText={(value) => handleOnChangeText(value, "email")}
                    label="Email"
                    placeholder="example@email.com"
                    autoCapitalize="none"
                />
                <FormInput
                    value={password}
                    onChangeText={(value) =>
                        handleOnChangeText(value, "password")
                    }
                    label="Password"
                    placeholder="********"
                    autoCapitalize="none"
                    secureTextEntry
                />
                <FormInput
                    value={confirmPassword}
                    onChangeText={(value) =>
                        handleOnChangeText(value, "confirmPassword")
                    }
                    label="Password"
                    placeholder="********"
                    autoCapitalize="none"
                    secureTextEntry
                />
                <FormSubmitButton onPress={sumbitForm} title="Sign UP" />
                <BottomLinks
                    leftPress={() => navigateToLogin(navigation)}
                    rightPress={() => navigateToForgetPassword(navigation)}
                    leftText={"Sign IN"}
                    rightText="Forget Password?"
                />
            </FormContainer>
        </>
    );
};

const styles = StyleSheet.create({});

export default SignupForm;

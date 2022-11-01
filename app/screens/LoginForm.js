import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import {
    isValidEmail,
    isValidObjField,
    navigateToForgetPassword,
    navigateToRegister,
    updateError,
} from "../utils/methods";
import { useLogin } from "../context/LoginProvider";
import { signInWithAsync } from "../utils/auth";

import AppForm from "../components/AppForm";
import AppNotification from "../components/AppNotification";
import BottomLinks from "../components/BottomLinks";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import Heading from "../components/Heading";

const LoginForm = ({ navigation }) => {
    const { setIsLoggedIn, setProfile, setLoading } = useLogin();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const [type, setType] = useState("");
    const [text, setText] = useState("");

    const { email, password } = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };

    const isValidForm = () => {
        if (!isValidObjField(userInfo))
            return updateError("Fill all fields!", setText, "error", setType);

        if (!isValidEmail(email))
            return updateError("Invalid Email!", setText, "error", setType);

        if (!password.trim() || password.length < 8)
            return updateError(
                "Password is less then 8 characters!",
                setText,
                "error",
                setType
            );

        return true;
    };

    const submitForm = async () => {
        if (isValidForm()) {
            setLoading(true);
            const res = await signInWithAsync(
                userInfo.email,
                userInfo.password
            );

            if (!res.success) {
                setLoading(false);
                return updateError(
                    res.message,
                    setText,
                    "error",
                    setType,
                    setIsLoggedIn
                );
            }

            if (res.success) {
                setUserInfo({ email: "", password: "" });
                // console.log(res);
                const newProfile = { token: res.token, user: res.user };
                setProfile(newProfile);
                setIsLoggedIn(true);
            }
            // console.log(res);
            setLoading(false);
        }
    };

    return (
        <>
            <AppForm login={true} />
            <FormContainer>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Heading title="Login" />
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
                <FormSubmitButton onPress={submitForm} title="Sign IN" />
                <BottomLinks
                    leftPress={() => navigateToRegister(navigation)}
                    rightPress={() => navigateToForgetPassword(navigation)}
                    leftText={"Sign UP"}
                    rightText="Forget Password?"
                />
            </FormContainer>
        </>
    );
};

const styles = StyleSheet.create({});

export default LoginForm;

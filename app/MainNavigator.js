import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppForm from "./components/AppForm";
import ImageUpload from "./components/ImageUpload";
import UserProfile from "./components/UserProfile";
import { useLogin } from "./context/LoginProvider";
import DrawerNavigator from "./DrawerNaviagtor";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgetPassword from "./components/ForgetPassword";
import Verification from "./components/Verification";
import AppLoader from "./components/AppLoader";

const Stack = createStackNavigator();

const StackNavigator = () => {
    const {loading} = useLogin()
    return (
        <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={LoginForm} name="Login" />
            <Stack.Screen component={SignupForm} name="Register" />
            <Stack.Screen component={ForgetPassword} name="ForgetPassword" />
            <Stack.Screen component={Verification} name="Verification" />
            <Stack.Screen component={ImageUpload} name="ImageUpload" />
            <Stack.Screen component={UserProfile} name="UserProfile" />
        </Stack.Navigator>
        {loading ? <AppLoader/> : null}
        </>
    );
};

const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useLogin } from "./context/LoginProvider";

import LoginForm from "./screens/LoginForm";
import SignupForm from "./screens/SignupForm";
import ForgetPassword from "./screens/ForgetPassword";
import Verification from "./screens/Verification";
import ImageUpload from "./screens/ImageUpload";
import UserProfile from "./screens/UserProfile";
import AppLoader from "./components/AppLoader";
import DrawerNavigator from "./DrawerNaviagtor";

const Stack = createStackNavigator();

const StackNavigator = () => {
    const { loading } = useLogin();
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={LoginForm} name="Login" />
                <Stack.Screen component={SignupForm} name="Register" />
                <Stack.Screen
                    component={ForgetPassword}
                    name="ForgetPassword"
                />
                <Stack.Screen component={Verification} name="Verification" />
                <Stack.Screen component={ImageUpload} name="ImageUpload" />
                <Stack.Screen component={UserProfile} name="UserProfile" />
            </Stack.Navigator>
            {loading ? <AppLoader /> : null}
        </>
    );
};

const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;

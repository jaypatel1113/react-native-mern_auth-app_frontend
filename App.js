import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./app/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";

const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: "#fff" },
};
export default function App() {
    return (
        <LoginProvider>
            <NavigationContainer theme={theme}>
                <MainNavigator />
            </NavigationContainer>
        </LoginProvider>
    );
}

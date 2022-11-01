import { AsyncStorage } from "react-native";

import client from "../api/client";

const catchError = (error) => {
    if (error?.response?.data) {
        // console.log(error.response.data)
        return error.response.data;
    }
    return { success: false, message: error.message };
};

export const signup = async (userdata) => {
    try {
        // console.log(userdata);

        const { data } = await client.post("/create-user", { ...userdata });
        return data;
    } catch (error) {
        return catchError(error);
        // console.log(error?.response?.data);
    }
};

export const signin = async (userdata) => {
    try {
        // console.log(userdata);
        const { data } = await client.post("/sign-in", { ...userdata });
        return data;
    } catch (error) {
        return catchError(error);
    }
};

export const forgetpass = async (userdata) => {
    try {
        // console.log(userdata);
        const { data } = await client.post("/forget-password", { ...userdata });
        return data;
    } catch (error) {
        return catchError(error);
    }
};

export const verifycode = async (otp, id) => {
    try {
        const { data } = await client.post("/verify-email", { otp, id });
        return data;
    } catch (error) {
        return catchError(error);
    }
};

export const logout = async (token) => {
    try {
        const token = await AsyncStorage.getItem("token");

        if (token !== null) {
            const { data } = await client.get("/sign-out", {
                headers: {
                    // Accept: "application/json",
                    authorization: `JWT ${token}`,
                },
            });
            if (data.success) {
                await AsyncStorage.removeItem("token");
                return true;
            }
        }
        return false;
    } catch (error) {
        catchError(error);
        return false;
    }
};

export const signInWithAsync = async (email, password) => {
    try {
        // console.log(email, password);
        const { data } = await client.post("/sign-in", { email, password });
        if (data.success) {
            const token = data.token;
            const res = await AsyncStorage.setItem("token", token);
        }
        return data;
    } catch (error) {
        return catchError(error);
    }
};

import React, { createContext, useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

import client from "../api/client";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
            const res = await client.get("/profile", {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });
            if (res.data.success) {
                setProfile(res.data.profile);
                setIsLoggedIn(true);
            } else {
                setProfile({});
                setIsLoggedIn(false);
            }
            setLoading(false);
        } else {
            setProfile({});
            setLoading(false);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [isLoggedIn]);

    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, loading, setLoading }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;

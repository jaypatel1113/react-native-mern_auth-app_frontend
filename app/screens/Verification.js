import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

import { isValidObjField, updateError } from "../utils/methods";
import { signin, verifycode } from "../utils/auth";
import { useLogin } from "../context/LoginProvider";

import AppNotification from "../components/AppNotification";

const Verification = ({ route, navigation }) => {
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const { setLoading } = useLogin();

    const { profile } = route.params;

    const inputs = Array(4).fill("");
    const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" });
    const [nextInpInd, setNextInpInd] = useState(0);
    const inpRef = useRef();
    let newInpIndex = 0;

    const handleOnChange = (code, index) => {
        const newOtp = { ...otp };
        newOtp[index] = code;
        setOtp(newOtp);

        const lastInpIndex = inputs.length - 1;

        if (!code) {
            newInpIndex = index === 0 ? 0 : index - 1;
        } else {
            newInpIndex = index === lastInpIndex ? lastInpIndex : index + 1;
        }
        setNextInpInd(newInpIndex);
    };

    useEffect(() => {
        inpRef.current.focus();
    }, [nextInpInd]);

    const submitOtp = async () => {
        Keyboard.dismiss();

        if (isValidObjField(otp)) {
            setLoading(true);
            let code = "";
            Object.values(otp).forEach((v) => {
                code += v;
            });
            // console.log(code);

            const res = await verifycode(code, profile._id);
            // console.log(res);

            if (res.success) {
                setLoading(true);
                const signInRes = await signin({
                    email: profile.email,
                    password: profile.cpassword,
                });
                if (signInRes.success) {
                    setLoading(false);
                    navigation.dispatch(
                        StackActions.replace("ImageUpload", {
                            token: signInRes.token,
                        })
                    );
                }
            } else {
                setLoading(false);
                return updateError(res.message, setText, "error", setType);
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Text style={styles.heading}>Verify your Email</Text>
            </View>
            <Text style={styles.subHeading}>
                Please verfiy your email, PIN has been sent to your email!
            </Text>

            {text ? <AppNotification type={type} text={text} /> : null}

            <View style={styles.otpcont}>
                {inputs.map((inp, index) => {
                    return (
                        <View style={styles.inputCont} key={index.toString()}>
                            <TextInput
                                value={otp[index]}
                                onChangeText={(code) =>
                                    handleOnChange(code, index)
                                }
                                style={styles.input}
                                keyboardType="number-pad"
                                maxLength={1}
                                placeholder="0"
                                ref={nextInpInd === index ? inpRef : null}
                            />
                        </View>
                    );
                })}
            </View>
            <TouchableOpacity onPress={submitOtp} style={styles.icon}>
                <Entypo
                    name="check"
                    size={24}
                    color="#fff"
                    style={{ fontSize: 32 }}
                />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};


const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 120,
        justifyContent: "center",
    },
    heading: {
        fontSize: 28,
        marginTop: 15,
        color: "rgba(25,39,52,1)",
        fontWeight: "900",
        textAlign: "center",
    },
    subHeading: {
        color: "rgba(25,39,52,1)",
        textAlign: "center",
        marginBottom: 20,
        fontSize: 16,
    },
    otpcont: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: inputWidth / 2,
    },
    inputCont: {
        width: inputWidth,
        height: inputWidth,
        borderWidth: 2,
        borderColor: "rgba(25,39,52,1)",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        fontSize: 25,
        textAlign: "center",
        padding: 15,
        paddingHorizontal: 20,
    },
    icon: {
        backgroundColor: "rgba(25,39,52,1)",
        alignSelf: "center",
        padding: 15,
        fontSize: 32,
        borderRadius: 50,
        marginTop: 20,
    },
});

export default Verification;

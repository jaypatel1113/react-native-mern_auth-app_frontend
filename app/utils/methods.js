export const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim());
};

export const updateError = (msg, stateUpdater, errorType, errorUpdater) => {
    stateUpdater(msg);
    errorUpdater(errorType);
    setTimeout(() => {
        stateUpdater("");
        errorUpdater("");
    }, 3000);
};

export const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
};

export const navigateToLogin = (navigation) => {
    navigation.navigate("Login");
};

export const navigateToRegister = (navigation) => {
    navigation.navigate("Register");
};

export const navigateToForgetPassword = (navigation) => {
    navigation.navigate("ForgetPassword");
};

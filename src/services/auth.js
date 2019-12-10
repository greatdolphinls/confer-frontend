import axios from "axios";

import {
    getForgotPasswordUrl,
    getResetPasswordUrl
} from "./endpoints";

const forgotPassword = async data => {
    const url = getForgotPasswordUrl();
    const result = await axios.post(url, data);
    return result;
};

const resetPassword = async data => {
    const url = getResetPasswordUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    forgotPassword,
    resetPassword
};

import axios from "axios";
import urlJoin from "url-join";

import {
    getUserUrl,
    getForgotPasswordUrl,
    getResetPasswordUrl,
    getVerifyUserUrl,
    getUserRecommendUrl,
    getImportUserCSVUrl,
    getGenerateProfileUrl
} from "./endpoints";

const getUsers = async () => {
    const url = getUserUrl();
    const result = await axios.get(url);
    return result;
};

const getUser = async _id => {
    const url = urlJoin(getUserUrl(), _id);
    const result = await axios.get(url);
    return result;
}

const editUser = async data => {
    const url = getUserUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeUser = async _id => {
    const url = getUserUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

const addUser = async data => {
    const url = getUserUrl();
    const result = await axios.post(url, data);
    return result;
};

const verifyUser = async _id => {
    const url = urlJoin(getVerifyUserUrl(), _id);
    const result = await axios.get(url);
    return result;
}

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

const updateMyInfo = async (id, data) => {
    const url = urlJoin(getUserUrl(), id);
    const result = await axios.put(url, data);
    return result;
}

const getUserRecommend = async id => {
    const url = urlJoin(getUserRecommendUrl(), id);
    const result = await axios.get(url);
    return result;
}

const importUserCSV = async (data) => {
    const url = getImportUserCSVUrl();
    const result = await axios.post(url, data);
    return result;
};

const generateProfile = async (data) => {
    const url = getGenerateProfileUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    getUsers,
    getUser,
    editUser,
    removeUser,
    addUser,
    forgotPassword,
    resetPassword,
    verifyUser,
    updateMyInfo,
    getUserRecommend,
    importUserCSV,
    generateProfile
};

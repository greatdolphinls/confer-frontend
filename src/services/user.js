import axios from "axios";
import urlJoin from "url-join";

import { getUserUrl, getVerifyUserUrl } from "./endpoints";

const getUsers = async () => {
    const url = getUserUrl();
    const result = await axios.get(url);
    return result;
};

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

export {
    getUsers,
    editUser,
    removeUser,
    addUser,
    verifyUser
};

import axios from 'axios';
import urlJoin from "url-join";

import { getGroupUrl } from './endpoints';

const getGroups = async () => {
    const url = getGroupUrl();
    const result = await axios.get(url);
    return result;
};

const getGroup = async _id => {
    const url = urlJoin(getGroupUrl(), _id);
    const result = await axios.get(url);
    return result;
}

const addGroup = async data => {
    const url = getGroupUrl();
    const result = await axios.post(url, data);
    return result;
};

const editGroup = async data => {
    const url = getGroupUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeGroup = async _id => {
    const url = getGroupUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getGroups,
    getGroup,
    addGroup,
    editGroup,
    removeGroup
};

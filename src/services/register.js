import axios from 'axios';

import {
    getRegisterRequestUrl,
    getSendRegisterRequestUrl,
    getAddRegisterRequestUrl
} from './endpoints';

const getRegisters = async () => {
    const url = getRegisterRequestUrl('');
    const result = await axios.get(url);
    return result;
};

const addRegister = async data => {
    const url = getRegisterRequestUrl();
    const result = await axios.post(url, data);
    return result;
};

const editRegister = async data => {
    const url = getRegisterRequestUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeRegister = async _id => {
    const url = getRegisterRequestUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

const sendRegisterRequest = async data => {
    const url = getSendRegisterRequestUrl();
    const result = await axios.post(url, data);
    return result;
};

const addRegisterRequest = async data => {
    const url = getAddRegisterRequestUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    getRegisters,
    addRegister,
    editRegister,
    removeRegister,
    sendRegisterRequest,
    addRegisterRequest
};

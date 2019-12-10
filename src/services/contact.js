import axios from 'axios';

import { getContactUrl, getSendContactRequestUrl } from './endpoints';

const getContacts = async () => {
    const url = getContactUrl('');
    const result = await axios.get(url);
    return result;
};

const addContact = async data => {
    const url = getContactUrl();
    const result = await axios.post(url, data);
    return result;
};

const editContact = async data => {
    const url = getContactUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeContact = async _id => {
    const url = getContactUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

const sendContactRequest = async data => {
    const url = getSendContactRequestUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    getContacts,
    addContact,
    editContact,
    removeContact,
    sendContactRequest
};

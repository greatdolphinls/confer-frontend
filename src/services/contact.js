import axios from 'axios';

import { getContactUrl } from './endpoints';

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

export {
    getContacts,
    addContact,
    editContact,
    removeContact
};

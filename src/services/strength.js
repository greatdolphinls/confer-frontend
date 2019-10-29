import axios from 'axios';

import { getStrengthUrl } from './endpoints';

const getStrengths = async () => {
    const url = getStrengthUrl('');
    const result = await axios.get(url);
    return result;
};

const addStrength = async data => {
    const url = getStrengthUrl();
    const result = await axios.post(url, data);
    return result;
};

const editStrength = async data => {
    const url = getStrengthUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeStrength = async _id => {
    const url = getStrengthUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getStrengths,
    addStrength,
    editStrength,
    removeStrength
};

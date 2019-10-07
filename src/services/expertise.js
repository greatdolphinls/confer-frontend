import axios from 'axios';

import { getExpertiseUrl } from './endpoints';

const getExpertises = async () => {
    const url = getExpertiseUrl('');
    const result = await axios.get(url);
    return result;
};

const addExpertise = async data => {
    const url = getExpertiseUrl();
    const result = await axios.post(url, data);
    return result;
};

const editExpertise = async data => {
    const url = getExpertiseUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeExpertise = async _id => {
    const url = getExpertiseUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getExpertises,
    addExpertise,
    editExpertise,
    removeExpertise
};

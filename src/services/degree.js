import axios from 'axios';

import { getDegreeUrl } from './endpoints';

const getDegrees = async () => {
    const url = getDegreeUrl('');
    const result = await axios.get(url);
    return result;
};

const addDegree = async data => {
    const url = getDegreeUrl();
    const result = await axios.post(url, data);
    return result;
};

const editDegree = async data => {
    const url = getDegreeUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeDegree = async _id => {
    const url = getDegreeUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getDegrees,
    addDegree,
    editDegree,
    removeDegree
};

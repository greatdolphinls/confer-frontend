import axios from 'axios';

import { getStarUrl } from './endpoints';

const getStars = async () => {
    const url = getStarUrl('');
    const result = await axios.get(url);
    return result;
};

const addStar = async data => {
    const url = getStarUrl();
    const result = await axios.post(url, data);
    return result;
};

const editStar = async data => {
    const url = getStarUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeStar = async _id => {
    const url = getStarUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getStars,
    addStar,
    editStar,
    removeStar
};

import axios from 'axios';

import { getSearchUrl } from './endpoints';

const getSearches = async () => {
    const url = getSearchUrl('');
    const result = await axios.get(url);
    return result;
};

const addSearch = async data => {
    const url = getSearchUrl();
    const result = await axios.post(url, data);
    return result;
};

const editSearch = async data => {
    const url = getSearchUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeSearch = async _id => {
    const url = getSearchUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getSearches,
    addSearch,
    editSearch,
    removeSearch
};

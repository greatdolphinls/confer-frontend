import axios from 'axios';

import { getIndustryUrl } from './endpoints';

const getIndustries = async () => {
    const url = getIndustryUrl('');
    const result = await axios.get(url);
    return result;
};

const addIndustry = async data => {
    const url = getIndustryUrl();
    const result = await axios.post(url, data);
    return result;
};

const editIndustry = async data => {
    const url = getIndustryUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeIndustry = async _id => {
    const url = getIndustryUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getIndustries,
    addIndustry,
    editIndustry,
    removeIndustry
};

import axios from 'axios';
import urlJoin from "url-join";

import { getRecommendUrl, getRecommendsByReferrerUrl } from './endpoints';

const getRecommends = async () => {
    const url = getRecommendUrl();
    const result = await axios.get(url);
    return result;
};

const editRecommend = async data => {
    const url = getRecommendUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeRecommend = async _id => {
    const url = getRecommendUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

const addRecommend = async data => {
    const url = getRecommendUrl();
    const result = await axios.post(url, data);
    return result;
};

const getRecommendsByReferrerId = async (referrerId) => {
    const url = urlJoin(getRecommendsByReferrerUrl(), referrerId);
    const result = await axios.get(url);
    return result;
};


export {
    getRecommends,
    editRecommend,
    removeRecommend,
    addRecommend,
    getRecommendsByReferrerId
};

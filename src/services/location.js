import axios from 'axios';

import { getLocationUrl } from './endpoints';

const getLocations = async () => {
    const url = getLocationUrl('');
    const result = await axios.get(url);
    return result;
};

const addLocation = async data => {
    const url = getLocationUrl();
    const result = await axios.post(url, data);
    return result;
};

const editLocation = async data => {
    const url = getLocationUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeLocation = async _id => {
    const url = getLocationUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getLocations,
    addLocation,
    editLocation,
    removeLocation
};

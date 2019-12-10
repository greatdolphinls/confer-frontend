import axios from 'axios';

import { getPositionUrl } from './endpoints';

const getPositions = async () => {
    const url = getPositionUrl('');
    const result = await axios.get(url);
    return result;
};

const addPosition = async data => {
    const url = getPositionUrl();
    const result = await axios.post(url, data);
    return result;
};

const editPosition = async data => {
    const url = getPositionUrl();
    const result = await axios.put(url, data);
    return result;
};

const removePosition = async _id => {
    const url = getPositionUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getPositions,
    addPosition,
    editPosition,
    removePosition
};

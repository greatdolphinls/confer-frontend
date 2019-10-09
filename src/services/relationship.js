import axios from 'axios';

import { getRelationshipUrl } from './endpoints';

const getRelationships = async () => {
    const url = getRelationshipUrl('');
    const result = await axios.get(url);
    return result;
};

const addRelationship = async data => {
    const url = getRelationshipUrl();
    const result = await axios.post(url, data);
    return result;
};

const editRelationship = async data => {
    const url = getRelationshipUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeRelationship = async _id => {
    const url = getRelationshipUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getRelationships,
    addRelationship,
    editRelationship,
    removeRelationship
};

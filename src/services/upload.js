import axios from 'axios';

import { getUploadImageUrl } from './endpoints';

const uploadImage = async (data) => {
    const url = getUploadImageUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    uploadImage
};

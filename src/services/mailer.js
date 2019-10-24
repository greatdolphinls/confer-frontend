import axios from 'axios';

import { getContactCandidateUrl } from './endpoints';

const contactCandidate = async data => {
    const url = getContactCandidateUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    contactCandidate
};

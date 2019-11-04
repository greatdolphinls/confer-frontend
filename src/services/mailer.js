import axios from 'axios';

import { getContactCandidateUrl, getRequestSignupUrl } from './endpoints';

const contactCandidate = async data => {
    const url = getContactCandidateUrl();
    const result = await axios.post(url, data);
    return result;
};

const requestSignup = async data => {
    const url = getRequestSignupUrl();
    const result = await axios.post(url, data);
    return result;
};

export {
    contactCandidate,
    requestSignup
};

import axios from 'axios';
import urlJoin from 'url-join';

import { getCandidateUrl } from './endpoints';

const getCandidate = async _id => {
    const url = urlJoin(getCandidateUrl(), _id);
    const result = await axios.get(url);
    return result;
}

export {
    getCandidate
};

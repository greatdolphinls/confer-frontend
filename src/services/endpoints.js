
import urlJoin from 'url-join';

import config from '../config';

const loginPrefix = 'api/login';
const registerPrefix = 'api/register';
const forgotPasswordPrefix = 'api/forgot-password';
const resetPasswordPrefix = 'api/reset-password';
const usersPrefix = 'api/users';
const recommendsPrefix = 'api/recommends';
const expertisesPrefix = 'api/expertises';
const locationsPrefix = 'api/locations';
const recommendsByReferrerUrl = '/api/recommendsByReferrerId';
const recommendsByFilterUrl = '/api/recommendsByFilter';
const relationshipsPrefix = '/api/relationships';
const groupsPrefix = '/api/groups';
const verifyUserPrefix = '/api/verifyUser';
const verifyRecommendPrefix = '/api/verifyRecommend';
const addRecommendByUserPrefix = '/api/addRecommendByUser';
const degreesPrefix = '/api/degrees';
const uploadImagePrefix = '/api/uploadImage';
const userRecommendPrefix = '/api/userRecommend';
const skillsPrefix = 'api/skills';
const strengthsPrefix = 'api/strengths';
const registersPrefix = 'api/registers';
const sendRegisterRequestPrefix = 'api/sendRegisterRequest';
const addRegisterRequestPrefix = 'api/addRegisterRequest';
const contactsPrefix = 'api/contacts';

const getResetPasswordUrl = () => {
    return urlJoin(config.proxyUrl, resetPasswordPrefix);
};

const getForgotPasswordUrl = () => {
    return urlJoin(config.proxyUrl, forgotPasswordPrefix);
};

const getRegisterUrl = () => {
    return urlJoin(config.proxyUrl, registerPrefix);
};

const getLoginUrl = () => {
    return urlJoin(config.proxyUrl, loginPrefix);
};

const getExpertiseUrl = () => {
    return urlJoin(config.proxyUrl, expertisesPrefix);
};

const getUserUrl = () => {
    return urlJoin(config.proxyUrl, usersPrefix);
};

const getRecommendUrl = () => {
    return urlJoin(config.proxyUrl, recommendsPrefix);
};

const getRelationshipUrl = () => {
    return urlJoin(config.proxyUrl, relationshipsPrefix);
};

const getRecommendsByReferrerUrl = () => {
    return urlJoin(config.proxyUrl, recommendsByReferrerUrl);
};

const getRecommendsByFilterUrl = () => {
    return urlJoin(config.proxyUrl, recommendsByFilterUrl);
};

const getLocationUrl = () => {
    return urlJoin(config.proxyUrl, locationsPrefix);
};

const getGroupUrl = () => {
    return urlJoin(config.proxyUrl, groupsPrefix);
};

const getVerifyUserUrl = () => {
    return urlJoin(config.proxyUrl, verifyUserPrefix)
}

const getVerifyRecommendUrl = () => {
    return urlJoin(config.proxyUrl, verifyRecommendPrefix)
}

const getAddRecommendByUserUrl = () => {
    return urlJoin(config.proxyUrl, addRecommendByUserPrefix)
}

const getDegreeUrl = () => {
    return urlJoin(config.proxyUrl, degreesPrefix)
}

const getUploadImageUrl = () => {
    return urlJoin(config.proxyUrl, uploadImagePrefix)
}

const getUserRecommendUrl = () => {
    return urlJoin(config.proxyUrl, userRecommendPrefix)
}

const getSkillUrl = () => {
    return urlJoin(config.proxyUrl, skillsPrefix);
};

const getStrengthUrl = () => {
    return urlJoin(config.proxyUrl, strengthsPrefix);
};

const getRegisterRequestUrl = () => {
    return urlJoin(config.proxyUrl, registersPrefix);
};

const getContactUrl = () => {
    return urlJoin(config.proxyUrl, contactsPrefix);
};

const getSendRegisterRequestUrl = () => {
    return urlJoin(config.proxyUrl, sendRegisterRequestPrefix);
};

const getAddRegisterRequestUrl = () => {
    return urlJoin(config.proxyUrl, addRegisterRequestPrefix);
};

export {
    getResetPasswordUrl,
    getForgotPasswordUrl,
    getRegisterUrl,
    getLoginUrl,
    getUserUrl,
    getRecommendUrl,
    getRecommendsByReferrerUrl,
    getRecommendsByFilterUrl,
    getExpertiseUrl,
    getLocationUrl,
    getRelationshipUrl,
    getGroupUrl,
    getVerifyUserUrl,
    getVerifyRecommendUrl,
    getAddRecommendByUserUrl,
    getDegreeUrl,
    getUploadImageUrl,
    getUserRecommendUrl,
    getSkillUrl,
    getStrengthUrl,
    getRegisterRequestUrl,
    getSendRegisterRequestUrl,
    getAddRegisterRequestUrl,
    getContactUrl,
};

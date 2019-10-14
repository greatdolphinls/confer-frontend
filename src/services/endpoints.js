
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
    getGroupUrl
};

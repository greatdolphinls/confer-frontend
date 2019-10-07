import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
    getLoginUrl,
    getRegisterUrl,
    getForgotPasswordUrl,
    getResetPasswordUrl,
} from '../services/endpoints';
import { jwtTokenKey, pageLinks } from '../constants/links';
import AuthConstants from '../constants/reducerConstants/AuthConstants';
import { setErrors, clearErrors } from './error';
import setAuthToken from '../services/security/setAuthToken';
import response from '../constants/response';

export const registerUser = (
    user,
    successCallback,
    errorCallback
) => dispatch => {
    const url = getRegisterUrl();
    axios
        .post(url, user)
        .then(response => {
            successCallback();
        })
        .catch(error => {
            if (error.response) {
                const { status, data } = error.response;
                if (status === response.INTERNAL_SERVER_ERROR) {
                    errorCallback(false, data.message);
                } else {
                    dispatch(setErrors(error.response.data));
                    errorCallback(true, data.message);
                }
            } else {
                errorCallback(false);
            }
        });
};

export const loginUser = (user, history, successCallback, errorCallback) => dispatch => {
    const url = getLoginUrl();
    axios
        .post(url, user)
        .then(response => {
            const { token } = response.data;
            localStorage.setItem(jwtTokenKey, token);
            setAuthToken(token);
            const userInfo = jwt_decode(token);
            dispatch(setCurrentUser(userInfo));

            history.push(pageLinks.GroundRules.url);
            successCallback && successCallback(response);
        })
        .catch(error => {
            if (error.response) {
                dispatch(setErrors(error.response.data));
            }
            errorCallback && errorCallback(error);
        });
};

export const setCurrentUser = decoded => {
    return {
        type: AuthConstants.SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = history => dispatch => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser(null));

    if (history) {
        history.replace(pageLinks.SignIn.url);
    }
};

export const sendResetLink = (
    user,
    successCallback,
    errorCallback
) => dispatch => {
    const url = getForgotPasswordUrl();
    axios
        .post(url, user)
        .then(response => {
            successCallback(response.data.message);
        })
        .catch(error => {
            if (error.response) {
                const { status, data } = error.response
                if (status === response.INTERNAL_SERVER_ERROR) {
                    errorCallback(false, data.message);
                } else {
                    dispatch(setErrors(error.response.data));
                    errorCallback(true, data.message);
                }
            } else {
                errorCallback(false);
            }
        });
};

export const resetPassword = (
    user,
    successCallback,
    errorCallback
) => dispatch => {
    const url = getResetPasswordUrl();
    axios
        .post(url, user)
        .then(response => {
            dispatch(clearErrors());
            successCallback(response.data.message);
        })
        .catch(error => {
            if (error.response) {
                dispatch(setErrors(error.response.data));
                errorCallback(true, error.response.data.message);
            } else {
                errorCallback(false);
            }
        });
};

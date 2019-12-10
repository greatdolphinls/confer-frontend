import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
    getLoginUrl,
    getRegisterUrl,
    getRegisterCandidateUrl
} from '../services/endpoints';
import { getUser, getUserRecommend } from '../services/user';
import { jwtTokenKey, pageLinks } from '../constants/links';
import { roles } from '../constants/roles';
import AuthConstants from '../constants/reducerConstants/AuthConstants';
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
            const { token } = response.data;
            localStorage.setItem(jwtTokenKey, token);
            setAuthToken(token);
            const userInfo = jwt_decode(token);
            dispatch(setCurrentUser(userInfo));

            successCallback && successCallback(response);
        })
        .catch(error => {
            if (error.response) {
                const { status, data } = error.response;
                if (status === response.INTERNAL_SERVER_ERROR) {
                    errorCallback(false, data.message);
                } else {
                    errorCallback(true, data.message, error.response.status);
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

            if (userInfo.role === roles.ADMIN_ROLE) {
                history.push(pageLinks.AdminUserList.url);
            } else {
                history.push(pageLinks.RecommendCount.url);
            }
            successCallback && successCallback(response);
        })
        .catch(error => {
            errorCallback && errorCallback(error);
        });
};

export const registerCandidate = (user, successCallback, errorCallback) => dispatch => {
    const url = getRegisterCandidateUrl();
    axios
        .post(url, user)
        .then(response => {
            const { token } = response.data;
            localStorage.setItem(jwtTokenKey, token);
            setAuthToken(token);
            const userInfo = jwt_decode(token);
            dispatch(setCurrentUser(userInfo));

            successCallback && successCallback(response);
        })
        .catch(error => {
            errorCallback && errorCallback(error);
        });
};

export const setCurrentUser = decoded => {
    return {
        type: AuthConstants.SET_CURRENT_USER,
        payload: decoded
    };
};

export const editCurrentUserInfo = user => dispatch => {
    dispatch({
        type: AuthConstants.EDIT_CURRENT_USER_INFO,
        payload: user
    });
};

export const setCurrentProfile = () => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const response = await getUser(user.id);
        dispatch({
            type: AuthConstants.SET_CURRENT_PROFILE,
            payload: response.data
        });
    } catch (error) {
        console.log('great dolphin : [actions auth setCurrentProfile] error => ', error);
    }
}

export const editCurrentProfile = user => dispatch => {
    dispatch({
        type: AuthConstants.SET_CURRENT_PROFILE,
        payload: user
    });
};

export const logoutUser = history => dispatch => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser(null));

    if (history) {
        history.replace(pageLinks.SignIn.url);
    }
};

export const setCurrentUserRecommend = () => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const response = await getUserRecommend(user.id);
        dispatch({
            type: AuthConstants.SET_CURRENT_USER_RECOMMEND,
            payload: response.data
        });
    } catch (error) {
        console.log('great dolphin : [actions auth setCurrentUserRecommend] error => ', error);
    }
}

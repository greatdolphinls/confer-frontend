
import UserConstants from '../constants/reducerConstants/UserConstants'
import { getUsers } from '../services/user';
import { removeItemWithSlice } from '../utils/utility';

export const setUsers = refresh => async (dispatch, getState) => {
    try {
        const { user: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getUsers();
            dispatch({
                type: UserConstants.SET_USERS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions user setUsers] error => ', error);
    }
}

export const addEditUser = user => async (dispatch, getState) => {
    let { user: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === user._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = user;
    } else {
        data = [
            ...data,
            user
        ];
    }

    dispatch({
        type: UserConstants.SET_USERS,
        payload: data
    });
}

export const removeUser = user => async (dispatch, getState) => {
    let { user: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === user._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: UserConstants.SET_USERS,
        payload: data
    });
}
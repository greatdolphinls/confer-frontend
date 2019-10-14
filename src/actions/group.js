
import GroupConstants from '../constants/reducerConstants/GroupConstants'
import { getGroups } from '../services/group';
import { removeItemWithSlice } from '../utils/utility';

export const setGroups = refresh => async (dispatch, getState) => {
    try {
        const { group: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getGroups();
            dispatch({
                type: GroupConstants.SET_GROUPS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions group setGroups] error => ', error);
    }
}

export const addEditGroup = group => async (dispatch, getState) => {
    let { group: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === group._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = group;
    } else {
        data = [
            ...data,
            group
        ];
    }

    dispatch({
        type: GroupConstants.SET_GROUPS,
        payload: data
    });
}

export const removeGroup = group => async (dispatch, getState) => {
    let { group: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === group._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: GroupConstants.SET_GROUPS,
        payload: data
    });
}
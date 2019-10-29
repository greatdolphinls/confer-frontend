
import StrengthConstants from '../constants/reducerConstants/StrengthConstants'
import { getStrengths } from '../services/strength';
import { removeItemWithSlice } from '../utils/utility';

export const setStrengths = refresh => async (dispatch, getState) => {
    try {
        const { strength: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getStrengths();
            dispatch({
                type: StrengthConstants.SET_STRENGTHS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions strength setStrengths] error => ', error);
    }
}

export const addEditStrength = strength => async (dispatch, getState) => {
    let { strength: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === strength._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = strength;
    } else {
        data = [
            ...data,
            strength
        ];
    }

    dispatch({
        type: StrengthConstants.SET_STRENGTHS,
        payload: data
    });
}

export const removeStrength = strength => async (dispatch, getState) => {
    let { strength: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === strength._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: StrengthConstants.SET_STRENGTHS,
        payload: data
    });
}
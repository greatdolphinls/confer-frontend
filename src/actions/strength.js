
import StrengthConstants from '../constants/reducerConstants/StrengthConstants'
import { getStrengths } from '../services/strength';
import { removeItemWithSlice } from '../utils/utility';

export const setStrengths = refresh => async (dispatch, getState) => {
    try {
        const { strength: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getStrengths();
            const options = data.map(({ name }) => ({ label: name, value: name }));

            dispatch({
                type: StrengthConstants.SET_STRENGTHS,
                payload: {data, options}
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
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: StrengthConstants.SET_STRENGTHS,
        payload: {data, options}
    });
}

export const removeStrength = strength => async (dispatch, getState) => {
    let { strength: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === strength._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: StrengthConstants.SET_STRENGTHS,
        payload: {data, options}
    });
}
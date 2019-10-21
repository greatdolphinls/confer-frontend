
import DegreeConstants from '../constants/reducerConstants/DegreeConstants'
import { getDegrees } from '../services/degree';
import { removeItemWithSlice } from '../utils/utility';

export const setDegrees = refresh => async (dispatch, getState) => {
    try {
        const { degree: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getDegrees();
            dispatch({
                type: DegreeConstants.SET_DEGREES,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions degree setDegrees] error => ', error);
    }
}

export const addEditDegree = degree => async (dispatch, getState) => {
    let { degree: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === degree._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = degree;
    } else {
        data = [
            ...data,
            degree
        ];
    }

    dispatch({
        type: DegreeConstants.SET_DEGREES,
        payload: data
    });
}

export const removeDegree = degree => async (dispatch, getState) => {
    let { degree: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === degree._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: DegreeConstants.SET_DEGREES,
        payload: data
    });
}
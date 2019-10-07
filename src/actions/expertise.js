
import ExpertiseConstants from '../constants/reducerConstants/ExpertiseConstants'
import { getExpertises } from '../services/expertise';
import { removeItemWithSlice } from '../utils/utility';

export const setExpertises = refresh => async (dispatch, getState) => {
    try {
        const { expertise: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getExpertises();
            dispatch({
                type: ExpertiseConstants.SET_EXPERTISES,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions expertise setExpertises] error => ', error);
    }
}

export const addEditExpertise = expertise => async (dispatch, getState) => {
    let { expertise: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === expertise._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = expertise;
    } else {
        data = [
            ...data,
            expertise
        ];
    }

    dispatch({
        type: ExpertiseConstants.SET_EXPERTISES,
        payload: data
    });
}

export const removeExpertise = expertise => async (dispatch, getState) => {
    let { expertise: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === expertise._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: ExpertiseConstants.SET_EXPERTISES,
        payload: data
    });
}
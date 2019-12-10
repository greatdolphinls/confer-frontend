
import ExpertiseConstants from '../constants/reducerConstants/ExpertiseConstants'
import { getExpertises } from '../services/expertise';
import { removeItemWithSlice } from '../utils/utility';

export const setExpertises = refresh => async (dispatch, getState) => {
    try {
        const { expertise: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getExpertises();
            const options = data.map(({ name }) => ({ label: name, value: name }));
                        
            dispatch({
                type: ExpertiseConstants.SET_EXPERTISES,
                payload: {data, options}
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
    const options = data.map(({ name }) => ({ label: name, value: name }));
    dispatch({
        type: ExpertiseConstants.SET_EXPERTISES,
        payload: {data, options}
    });
}

export const removeExpertise = expertise => async (dispatch, getState) => {
    let { expertise: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === expertise._id
    ));

    data = removeItemWithSlice(data, targetIndex);

    const options = data.map(({ name }) => ({ label: name, value: name }));
    dispatch({
        type: ExpertiseConstants.SET_EXPERTISES,
        payload: {data, options}
    });
}

import IndustryConstants from '../constants/reducerConstants/IndustryConstants'
import { getIndustries } from '../services/industry';
import { removeItemWithSlice } from '../utils/utility';

export const setIndustries = refresh => async (dispatch, getState) => {
    try {
        const { industry: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getIndustries();
            const options = data.map(({ name }) => ({ label: name, value: name }));

            dispatch({
                type: IndustryConstants.SET_INDUSTRIES,
                payload: {data, options}
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions industry setIndustries] error => ', error);
    }
}

export const addEditIndustry = industry => async (dispatch, getState) => {
    let { industry: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === industry._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = industry;
    } else {
        data = [
            ...data,
            industry
        ];
    }
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: IndustryConstants.SET_INDUSTRIES,
        payload: {data, options}
    });
}

export const removeIndustry = industry => async (dispatch, getState) => {
    let { industry: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === industry._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: IndustryConstants.SET_INDUSTRIES,
        payload: {data, options}
    });
}
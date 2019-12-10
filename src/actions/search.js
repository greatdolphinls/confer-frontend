
import SearchConstants from '../constants/reducerConstants/SearchConstants'
import { getSearches } from '../services/search';
import { removeItemWithSlice } from '../utils/utility';

export const setSearches = refresh => async (dispatch, getState) => {
    try {
        const { search: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getSearches();
            const options = data.map(({ name }) => ({ label: name, value: name }));

            dispatch({
                type: SearchConstants.SET_SEARCHES,
                payload: {data, options}
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions search setSearches] error => ', error);
    }
}

export const addEditSearch = search => async (dispatch, getState) => {
    let { search: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === search._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = search;
    } else {
        data = [
            ...data,
            search
        ];
    }
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: SearchConstants.SET_SEARCHES,
        payload: {data, options}
    });
}

export const removeSearch = search => async (dispatch, getState) => {
    let { search: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === search._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: SearchConstants.SET_SEARCHES,
        payload: {data, options}
    });
}
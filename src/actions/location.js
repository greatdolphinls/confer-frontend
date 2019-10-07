
import LocationConstants from '../constants/reducerConstants/LocationConstants'
import { getLocations } from '../services/location';
import { removeItemWithSlice } from '../utils/utility';

export const setLocations = refresh => async (dispatch, getState) => {
    try {
        const { location: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getLocations();
            dispatch({
                type: LocationConstants.SET_LOCATIONS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions location setLocations] error => ', error);
    }
}

export const addEditLocation = location => async (dispatch, getState) => {
    let { location: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === location._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = location;
    } else {
        data = [
            ...data,
            location
        ];
    }

    dispatch({
        type: LocationConstants.SET_LOCATIONS,
        payload: data
    });
}

export const removeLocation = location => async (dispatch, getState) => {
    let { location: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === location._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: LocationConstants.SET_LOCATIONS,
        payload: data
    });
}
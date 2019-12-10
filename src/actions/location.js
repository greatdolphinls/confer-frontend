
import LocationConstants from '../constants/reducerConstants/LocationConstants'
import { getLocations } from '../services/location';
import { removeItemWithSlice } from '../utils/utility';
import locations from '../constants/locations';

export const setLocations = refresh => async (dispatch, getState) => {
    try {
        const { location: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getLocations();
            let options = data.filter(({ name }) => !locations.includes(name))
                .map(({ name }) => name);
            options = [
                ...locations,
                ...options
            ];
            dispatch({
                type: LocationConstants.SET_LOCATIONS,
                payload: { data, options }
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
    let options = data.filter(({ name }) => !locations.includes(name))
        .map(({ name }) => name);
    options = [
        ...locations,
        ...options
    ];

    dispatch({
        type: LocationConstants.SET_LOCATIONS,
        payload: { data, options }
    });
}

export const removeLocation = location => async (dispatch, getState) => {
    let { location: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === location._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    let options = data.filter(({ name }) => !locations.includes(name))
        .map(({ name }) => name);
    options = [
        ...locations,
        ...options
    ];

    dispatch({
        type: LocationConstants.SET_LOCATIONS,
        payload: { data, options }
    });
}
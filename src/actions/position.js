
import PositionConstants from '../constants/reducerConstants/PositionConstants'
import { getPositions } from '../services/position';
import { removeItemWithSlice } from '../utils/utility';

export const setPositions = refresh => async (dispatch, getState) => {
    try {
        const { position: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getPositions();
            const options = data.map(({ name }) => ({ label: name, value: name }));

            dispatch({
                type: PositionConstants.SET_POSITIONS,
                payload: {data, options}
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions position setPositions] error => ', error);
    }
}

export const addEditPosition = position => async (dispatch, getState) => {
    let { position: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === position._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = position;
    } else {
        data = [
            ...data,
            position
        ];
    }
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: PositionConstants.SET_POSITIONS,
        payload: {data, options}
    });
}

export const removePosition = position => async (dispatch, getState) => {
    let { position: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === position._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: PositionConstants.SET_POSITIONS,
        payload: {data, options}
    });
}

import RelationshipConstants from '../constants/reducerConstants/RelationshipConstants'
import { getRelationships } from '../services/relationship';
import { removeItemWithSlice } from '../utils/utility';

export const setRelationships = refresh => async (dispatch, getState) => {
    try {
        const { relationship: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getRelationships();
            dispatch({
                type: RelationshipConstants.SET_RELATIONSHIPS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions relationship setRelationships] error => ', error);
    }
}

export const addEditRelationship = relationship => async (dispatch, getState) => {
    let { relationship: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === relationship._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = relationship;
    } else {
        data = [
            ...data,
            relationship
        ];
    }

    dispatch({
        type: RelationshipConstants.SET_RELATIONSHIPS,
        payload: data
    });
}

export const removeRelationship = relationship => async (dispatch, getState) => {
    let { relationship: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === relationship._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: RelationshipConstants.SET_RELATIONSHIPS,
        payload: data
    });
}

import ContactConstants from '../constants/reducerConstants/ContactConstants'
import { getContacts } from '../services/contact';
import { removeItemWithSlice } from '../utils/utility';

export const setContacts = refresh => async (dispatch, getState) => {
    try {
        const { contact: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getContacts();
            dispatch({
                type: ContactConstants.SET_CONTACTS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions contact setContacts] error => ', error);
    }
}

export const addEditContact = contact => async (dispatch, getState) => {
    let { contact: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === contact._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = contact;
    } else {
        data = [
            ...data,
            contact
        ];
    }

    dispatch({
        type: ContactConstants.SET_CONTACTS,
        payload: data
    });
}

export const removeContact = contact => async (dispatch, getState) => {
    let { contact: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === contact._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: ContactConstants.SET_CONTACTS,
        payload: data
    });
}
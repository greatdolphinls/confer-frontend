
import RegisterConstants from '../constants/reducerConstants/RegisterConstants'
import { getRegisters } from '../services/register';
import { removeItemWithSlice } from '../utils/utility';

export const setRegisters = refresh => async (dispatch, getState) => {
    try {
        const { register: { data } } = getState();

        if (refresh || data.length === 0) {
            const response = await getRegisters();
            dispatch({
                type: RegisterConstants.SET_REGISTERS,
                payload: response.data
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions register setRegisters] error => ', error);
    }
}

export const addEditRegister = register => async (dispatch, getState) => {
    let { register: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === register._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = register;
    } else {
        data = [
            ...data,
            register
        ];
    }

    dispatch({
        type: RegisterConstants.SET_REGISTERS,
        payload: data
    });
}

export const removeRegister = register => async (dispatch, getState) => {
    let { register: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === register._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    dispatch({
        type: RegisterConstants.SET_REGISTERS,
        payload: data
    });
}
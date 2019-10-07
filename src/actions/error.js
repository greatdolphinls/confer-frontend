import ErrorConstants from '../constants/reducerConstants/ErrorConstants'

export const setErrors = error => dispatch => {
    dispatch({
        type: ErrorConstants.GET_ERRORS,
        payload: error
    });
};

export const clearErrors = () => dispatch => {
    dispatch(setErrors(null));
};

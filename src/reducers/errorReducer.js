import ErrorConstants from '../constants/reducerConstants/ErrorConstants'

const initialState = {
    errorStatus: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ErrorConstants.GET_ERRORS:
            return {
                ...state,
                errorStatus: action.payload
            };
        default:
            return state;
    }
}

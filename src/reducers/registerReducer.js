import RegisterConstants from '../constants/reducerConstants/RegisterConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RegisterConstants.SET_REGISTERS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

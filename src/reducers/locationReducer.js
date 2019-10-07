import LocationConstants from '../constants/reducerConstants/LocationConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LocationConstants.SET_LOCATIONS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

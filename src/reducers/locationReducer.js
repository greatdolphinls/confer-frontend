import LocationConstants from '../constants/reducerConstants/LocationConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LocationConstants.SET_LOCATIONS:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

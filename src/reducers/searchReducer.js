import SearchConstants from '../constants/reducerConstants/SearchConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SearchConstants.SET_SEARCHES:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

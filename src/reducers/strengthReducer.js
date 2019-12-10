import StrengthConstants from '../constants/reducerConstants/StrengthConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case StrengthConstants.SET_STRENGTHS:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

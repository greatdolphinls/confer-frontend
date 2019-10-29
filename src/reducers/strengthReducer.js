import StrengthConstants from '../constants/reducerConstants/StrengthConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case StrengthConstants.SET_STRENGTHS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

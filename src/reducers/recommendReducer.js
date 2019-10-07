import RecommendConstants from '../constants/reducerConstants/RecommendConstants'

const initialState = {
    user: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RecommendConstants.SET_USER_RECOMMENDS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

import RecommendConstants from '../constants/reducerConstants/RecommendConstants'

const initialState = {
    user: [],
    discover: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RecommendConstants.SET_USER_RECOMMENDS:
            return {
                ...state,
                user: action.payload
            };
        case RecommendConstants.SET_DISCOVER_RECOMMENDS:
            return {
                ...state,
                discover: action.payload
            };
        default:
            return state;
    }
}

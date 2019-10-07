import ExpertiseConstants from '../constants/reducerConstants/ExpertiseConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ExpertiseConstants.SET_EXPERTISES:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

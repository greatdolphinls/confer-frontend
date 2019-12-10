import ExpertiseConstants from '../constants/reducerConstants/ExpertiseConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ExpertiseConstants.SET_EXPERTISES:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

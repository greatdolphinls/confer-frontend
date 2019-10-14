import UserConstants from '../constants/reducerConstants/UserConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UserConstants.SET_USERS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

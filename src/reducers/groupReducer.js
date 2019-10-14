import GroupConstants from '../constants/reducerConstants/GroupConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GroupConstants.SET_GROUPS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

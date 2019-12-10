import ContactConstants from '../constants/reducerConstants/ContactConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ContactConstants.SET_CONTACTS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

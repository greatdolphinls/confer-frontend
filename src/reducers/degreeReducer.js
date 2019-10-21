import DegreeConstants from '../constants/reducerConstants/DegreeConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DegreeConstants.SET_DEGREES:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

import DegreeConstants from '../constants/reducerConstants/DegreeConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DegreeConstants.SET_DEGREES:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

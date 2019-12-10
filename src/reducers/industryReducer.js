import IndustryConstants from '../constants/reducerConstants/IndustryConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case IndustryConstants.SET_INDUSTRIES:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

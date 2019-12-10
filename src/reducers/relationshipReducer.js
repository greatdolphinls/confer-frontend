import RelationshipConstants from '../constants/reducerConstants/RelationshipConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RelationshipConstants.SET_RELATIONSHIPS:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}

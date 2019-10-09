import RelationshipConstants from '../constants/reducerConstants/RelationshipConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RelationshipConstants.SET_RELATIONSHIPS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

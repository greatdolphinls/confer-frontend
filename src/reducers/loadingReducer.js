
import LoadingConstants from '../constants/reducerConstants/LoadingConstants'

const initialState = {
    loadingStatus: {
        loading: false,
        text: 'Please wait...'
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LoadingConstants.SET_LOADING_STATUS:
            return {
                ...state,
                loadingStatus: action.payload
            };
        default:
            return state;
    }
}

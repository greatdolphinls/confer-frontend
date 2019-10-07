import LoadingConstants from '../constants/reducerConstants/LoadingConstants'

export const setLoadingStatus = loadingStatus => dispatch => {
    dispatch({
        type: LoadingConstants.SET_LOADING_STATUS,
        payload: loadingStatus
    });
};


import RecommendConstants from '../constants/reducerConstants/RecommendConstants'
import { getRecommendsByReferrerId, getRecommendsByFilter } from '../services/recommend';

export const setUserRecommends = () => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const response = await getRecommendsByReferrerId(user.id);
        dispatch({
            type: RecommendConstants.SET_USER_RECOMMENDS,
            payload: response.data
        });
    } catch (error) {
        console.log('great dolphin : [actions recommend setUserRecommends] error => ', error);
    }
}

export const setDiscoverRecommends = (refresh, filter) => async (dispatch, getState) => {
    try {

        let { recommend: { discover } } = getState();
        const data = { filter }

        const response = await getRecommendsByFilter(data);
        if (refresh) {
            discover = [...response.data];
        } else {
            discover = [...discover, ...response.data];
        }

        dispatch({
            type: RecommendConstants.SET_DISCOVER_RECOMMENDS,
            payload: discover
        });
    } catch (error) {
        console.log('great dolphin : [actions recommend setDiscoverRecommends] error => ', error);
    }
}
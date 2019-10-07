
import RecommendConstants from '../constants/reducerConstants/RecommendConstants'
import { getRecommendsByReferrerId } from '../services/recommend';

export const setUserRecommends = () => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const response = await getRecommendsByReferrerId(user.id);
        dispatch({
            type: RecommendConstants.SET_USER_RECOMMENDS,
            payload: response.data
        });
    } catch (error) {
        console.log('great dolphin : [actions recommend setRecommends] error => ', error);
    }
}
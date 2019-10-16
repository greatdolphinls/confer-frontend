
import RecommendConstants from '../constants/reducerConstants/RecommendConstants'
import { getRecommends, getRecommendsByReferrerId, getRecommendsByFilter } from '../services/recommend';
import { removeItemWithSlice } from '../utils/utility';

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

export const setRecommends = refresh => async (dispatch, getState) => {
  try {
    const { recommend: { data } } = getState();

    if (refresh || data.length === 0) {
      const response = await getRecommends();
      dispatch({
        type: RecommendConstants.SET_RECOMMENDS,
        payload: response.data
      });
    }
  } catch (error) {
    console.log('great dolphin : [actions recommend setRecommends] error => ', error);
  }
}

export const addEditRecommend = recommend => async (dispatch, getState) => {
  let { recommend: { data } } = getState();

  const targetIndex = data.findIndex(item => (
    item._id === recommend._id
  ));
  if (targetIndex >= 0) {
    data[targetIndex] = recommend;
  } else {
    data = [
      ...data,
      recommend
    ];
  }

  dispatch({
    type: RecommendConstants.SET_RECOMMENDS,
    payload: data
  });
}

export const removeRecommend = recommend => async (dispatch, getState) => {
  let { recommend: { data } } = getState();

  const targetIndex = data.findIndex(item => (
    item._id === recommend._id
  ));

  data = removeItemWithSlice(data, targetIndex);
  dispatch({
    type: RecommendConstants.SET_RECOMMENDS,
    payload: data
  });
}
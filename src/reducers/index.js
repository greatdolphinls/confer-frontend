
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import expertiseReducer from './expertiseReducer';
import recommendReducer from './recommendReducer';
import locationReducer from './locationReducer';
import relationshipReducer from './relationshipReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  errors: errorReducer,
  expertise: expertiseReducer,
  recommend: recommendReducer,
  location: locationReducer,
  relationship: relationshipReducer
});
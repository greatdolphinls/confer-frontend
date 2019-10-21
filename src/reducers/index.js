
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import groupReducer from './groupReducer';
import userReducer from './userReducer';
import recommendReducer from './recommendReducer';
import expertiseReducer from './expertiseReducer';
import locationReducer from './locationReducer';
import relationshipReducer from './relationshipReducer';
import degreeReducer from './degreeReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  errors: errorReducer,
  group: groupReducer,
  user: userReducer,
  recommend: recommendReducer,
  expertise: expertiseReducer,
  location: locationReducer,
  relationship: relationshipReducer,
  degree: degreeReducer
});
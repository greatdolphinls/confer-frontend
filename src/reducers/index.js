
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import groupReducer from './groupReducer';
import userReducer from './userReducer';
import recommendReducer from './recommendReducer';
import expertiseReducer from './expertiseReducer';
import locationReducer from './locationReducer';
import relationshipReducer from './relationshipReducer';
import degreeReducer from './degreeReducer';
import skillReducer from './skillReducer';
import strengthReducer from './strengthReducer';
import registerReducer from './registerReducer';
import contactReducer from './contactReducer';
import searchReducer from './searchReducer';
import positionReducer from './positionReducer';
import industryReducer from './industryReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  group: groupReducer,
  user: userReducer,
  recommend: recommendReducer,
  expertise: expertiseReducer,
  location: locationReducer,
  relationship: relationshipReducer,
  degree: degreeReducer,
  skill: skillReducer,
  strength: strengthReducer,
  register: registerReducer,
  contact: contactReducer,
  search: searchReducer,
  position: positionReducer,
  industry: industryReducer
});
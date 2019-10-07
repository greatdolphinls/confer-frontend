import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { createLogger } = require('redux-logger');
    return composeWithDevTools(
      compose(
        applyMiddleware(
          ...middleware,
          createLogger({ collapsed: true })
        )
      )
    );
  }
  return applyMiddleware(...middleware);
};

const store = createStore(
  persistedReducer,
  inititalState,
  compose(bindMiddleware([thunk]))
);

export const persistor = persistStore(store);
export default store;
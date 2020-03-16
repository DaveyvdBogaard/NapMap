import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from './sagas/index';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
//   // Whitelist (Save Specific Reducers)
//   whitelist: [
//     'authReducer',
//   ],
//   // Blacklist (Don't Save Specific Reducers)
//   blacklist: [
//     'counterReducer',
//   ],
};

// Middleware: Redux Persist Persisted Reducer
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux: Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
    )
  )
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga)

// Exports
export {
  store,
  persistor,
};
import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { rootReducer } from "../reducers/rootReducers";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import {  useDispatch } from "react-redux";


  const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) : (null || compose);

  //const composeEnhancers = null || compose;

  const persistConfig = {
    key: 'acuerdoType',
    storage: storage,
    whitelist: ['acuerdos'] // which reducer want to store
  };
  const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const  persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
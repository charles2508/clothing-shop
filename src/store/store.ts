import { compose, createStore, applyMiddleware } from 'redux';
import {persistReducer, persistStore } from 'redux-persist';
import  storage  from 'redux-persist/lib/storage';
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { PersistConfig } from 'redux-persist';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

// const loggerMiddleware = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }

//     console.log('type: ', action.type);
//     console.log('payload: ', action.payload);
//     console.log('current state: ', store.getState());

//     next(action);

//     console.log('next state: ', store.getState());
// }
const sagaMiddleware = createSagaMiddleware();

const middleWares = [logger, sagaMiddleware];             
const composedEnhancers = compose(applyMiddleware(...middleWares));

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
} 
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
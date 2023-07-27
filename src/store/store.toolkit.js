// Use Redux Toolkit to simplify set up process
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';

const middleWares = [logger];

export const store = configureStore({
    reducer: rootReducer,
    middleware: middleWares
})
import thunk from 'redux-thunk'
import { configureStore, combineReducers, compose } from '@reduxjs/toolkit'
import authReducer from './reducers/loginReducer'
import documentReducer from './reducers/documentReducer'
import modelReducer from './reducers/modelReducer'

export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            documents: documentReducer,
            models: modelReducer,
        },
        devTools: true,
        middleware: [thunk],
    },
    ( window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() ) ||
    compose
)

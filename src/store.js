import thunk from 'redux-thunk'
import { configureStore, combineReducers, compose } from '@reduxjs/toolkit'
import authReducer from './reducers/loginReducer'

export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
        },
        devTools: true,
        middleware: [thunk],
    },
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
)

// import { configureStore } from '@reduxjs/toolkit';
// import loginReducer from './reducer/loginReducer';

// export const store = configureStore({
//   reducer: {
//     login: loginReducer,
//   },
// });
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

// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from "./slices/auth";
// import messageReducer from "./slices/message";

// const reducer = {
//   auth: authReducer,
//   message: messageReducer
// }

// export const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// });

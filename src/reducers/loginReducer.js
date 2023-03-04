// import undoable from 'redux-undo'
// import { combineReducers } from 'redux'
// import {
//     USER_LOGIN_REQUEST,
//     USER_LOGIN_SUCCESS,
//     USER_LOGIN_FAIL,
//     USER_LOGOUT,
// } from '../constants/loginConstant'

// const auth = (state, action) => {
//     switch (action.type) {
//         case USER_LOGIN_REQUEST:
//             return {
//                 id: action.id,
//                 text: action.text,
//                 loggedIn: false,
//             }
//         case USER_LOGIN_SUCCESS:
//             return {
//                 id: action.id,
//                 text: action.text,
//                 loggedIn: true,
//             }
//         case USER_LOGOUT:
//             return {
//                 id: -1,
//                 text: '',
//                 loggedIn: false,
//             }
//         case USER_LOGIN_FAIL:
//             return {
//                 id: -1,
//                 text: '',
//                 loggedIn: false,
//             }
//         default:
//             return state
//     }
// }
// const undoableTodos = undoable(auth)

// const loginApp = combineReducers({
//     auth,
// })

// export default loginApp

import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
const userAuth = createSlice({
    name: 'auth',
    initialState: {
        id: -1,
        text: '',
        isLoading: false,
        loggedIn: false,
    },
    reducers: {
        loginRequest(state, action) {
            console.log('loginRequest dispatched 4')
            console.log(current(state))
            return {
                id: -1,
                text: '',
                isLoading: true,
                loggedIn: false,
            }
        },
        loginSuccess(state, action) {
            console.log('loginSuccess dispatched 5')
            console.log(current(state))
            return {
                id: 196,
                text: 'Aayush Shah',
                isLoading: false,
                loggedIn: true,
            }
        },
        logoutRequest(state, action) {
            console.log('logoutRequest dispatched 6')
            console.log(current(state))
            return {
                id: -1,
                text: '',
                isLoading: false,
                loggedIn: true,
            }
        },
    },
})

export const { loginRequest, loginSuccess, logoutRequest } = userAuth.actions
export default userAuth.reducer

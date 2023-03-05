import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
import { userLogin } from '../actions/loginAction'
import axios from 'axios'
import BASE_URL from '../backend'

// initialize userToken from local storage
const user_id = localStorage.getItem('user_id')
    ? localStorage.getItem('user_id')
    : null

const session_id = localStorage.getItem('session_id')
    ? localStorage.getItem('session_id')
    : null

const userAuth = createSlice({
    name: 'auth',
    initialState: {
        session_id: session_id,
        user_id: user_id,
        username: '',
        email: '',
        error: '',
        loading: false,
    },
    reducers: {
        logout: async (state) => {
            const res = await axios.post(`${BASE_URL}/user/logout`)
            console.log(res)
            localStorage.removeItem('user_id')
            localStorage.removeItem('session_id')
            state.loading = false
            state.user_id = null
            state.session_id = null
            state.error = null
            state.email = ''
            state.username = ''
            return state
        },
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            console.log('loginRequest dispatched 4')
            console.log(current(state))
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user_id = payload.user_id
            state.session_id = payload.session_id
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export const { logout } = userAuth.actions
export default userAuth.reducer

// import { createSlice } from '@reduxjs/toolkit'
// import { current } from '@reduxjs/toolkit'
// const userAuth = createSlice({
//     name: 'auth',
//     initialState: {
//         id: -1,
//         text: '',
//         isLoading: false,
//         loggedIn: false,
//     },
//     reducers: {
//         loginRequest(state, action) {
//             console.log('loginRequest dispatched 4')
//             console.log(current(state))
//             return {
//                 id: -1,
//                 text: '',
//                 isLoading: true,
//                 loggedIn: false,
//             }
//         },
//         loginSuccess(state, action) {
//             console.log('loginSuccess dispatched 5')
//             console.log(current(state))
//             return {
//                 id: 196,
//                 text: 'Aayush Shah',
//                 isLoading: false,
//                 loggedIn: true,
//             }
//         },
//         logoutRequest(state, action) {
//             console.log('logoutRequest dispatched 6')
//             console.log(current(state))
//             return {
//                 id: -1,
//                 text: '',
//                 isLoading: false,
//                 loggedIn: true,
//             }
//         },
//     },
// })

// export const { loginRequest, loginSuccess, logoutRequest } = userAuth.actions
// export default userAuth.reducer

import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
import { userLogin, userSignup } from '../actions/loginAction'
import axios from 'axios'

// initialize userToken from local storage
const user_id = localStorage.getItem( 'user_id' )
    ? localStorage.getItem( 'user_id' )
    : null

const session_id = localStorage.getItem( 'session_id' )
    ? localStorage.getItem( 'session_id' )
    : null

const username = localStorage.getItem( 'username' )
    ? localStorage.getItem( 'username' )
    : null

const email = localStorage.getItem( 'email' )
    ? localStorage.getItem( 'email' )
    : null

const userAuth = createSlice( {
    name: 'auth',
    initialState: {
        session_id: session_id,
        user_id: user_id,
        username: username,
        email: email,
        error: '',
        loading: false,
    },
    reducers: {
        logout: async ( state ) => {
            const res = await axios.post( `${process.env.REACT_APP_BACKEND}/user/logout` )
            localStorage.removeItem( 'user_id' )
            localStorage.removeItem( 'session_id' )
            localStorage.removeItem( 'username' )
            localStorage.removeItem( 'email' )
            state.loading = false
            state.user_id = null
            state.session_id = null
            state.error = null
            state.email = ''
            state.username = ''
        },
    },
    extraReducers: {
        [userLogin.pending]: ( state ) => {
            state.loading = true
            state.error = null

            return state
        },
        [userLogin.fulfilled]: ( state, { payload } ) => {
            state.loading = false
            state.user_id = payload.user_id
            state.session_id = payload.session_id
            state.user_id = payload.username
            state.session_id = payload.email
        },
        [userLogin.rejected]: ( state, { payload } ) => {
            state.loading = false
            state.error = payload
        },
        [userSignup.pending]: ( state ) => {
            state.loading = true
            state.error = null
            return state
        },
        [userSignup.fulfilled]: ( state, { payload } ) => {
            state.loading = false
            state.error = !payload.success
        },
        [userSignup.rejected]: ( state, { payload } ) => {
            state.loading = false
            state.error = !payload.success
        },
    },
} )

export const { logout } = userAuth.actions
export default userAuth.reducer

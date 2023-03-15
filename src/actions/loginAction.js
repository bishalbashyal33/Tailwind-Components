import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import BASE_URL from '../backend'

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            console.log('Before sending the login request')
            const { data } = await axios.post(
                `${BASE_URL}/user/signin`,
                { email: email, password: password },
                config
            )
            console.log("Storing the user's token in local storage")
            // store user's token in local storage
            console.log('user details: ', data)
            localStorage.setItem('user_id', data.user_id)
            localStorage.setItem('username', data.username)
            localStorage.setItem('email', data.email)
            localStorage.setItem('session_id', data.session_id)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userSignup = createAsyncThunk(
    'auth/signup',
    async ({ email, password, userName }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            console.log('Before sending the login request')
            const { data } = await axios.post(
                `${BASE_URL}/user/signup`,
                {
                    email: email,
                    password: password,
                    userName: userName,
                    confirm_password: password,
                },
                config
            )
            console.log("Storing the user's token in local storage")
            // store user's token in local storage
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

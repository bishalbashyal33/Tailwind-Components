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
            const { data } = await axios.post(
                `${BASE_URL}/user/signin`,
                { email: email, password: password },
                config
            )
            // store user's token in local storage
            localStorage.setItem('user_id', data.user_id)
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

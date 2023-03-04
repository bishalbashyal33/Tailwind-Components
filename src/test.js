import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import {
    loginRequest,
    loginSuccess,
    logoutRequest,
} from './reducers/loginReducer'

const Login = () => {
    let navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const { id, text, isLoading, loggedIn } = useSelector((state) => state.auth)

    useEffect(() => {
        console.log('auth', id, text, isLoading, loggedIn)
        // console.log('isLoading', auth.isLoading)
        // console.log('loggedIn', auth.loggedIn)
        // console.log('text', auth.text)
        // console.log('id', auth.id)
    }, [])

    const dispatch = useDispatch()

    const initialValues = {
        username: '',
        password: '',
    }

    const handleLogin = (event) => {
        const { username, password } = ['hello', 'world']
        dispatch(loginRequest())
        console.log('auth', id, text, isLoading, loggedIn)
        // console.log(auth)
        console.log('loginRequest dispatched')
        dispatch(loginSuccess())
        console.log('auth', id, text, isLoading, loggedIn)
        console.log('loginSuccess dispatched')
        // console.log(auth)s

        navigate('/')
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login

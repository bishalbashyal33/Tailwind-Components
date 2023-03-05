import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './actions/loginAction'

const LoginScreen = () => {
    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault()
        const data = {
            email: 'janaksh@gmail.com',
            password: 'janaksh',
        }
        dispatch(userLogin(data))
    }

    return (
        <div>
            {loading && <h1>I am loading</h1>}
            {error && <h1>{error}</h1>}
            <input type="text" placeholder="username" readonly={loading} />
            <button
                type="submit"
                className="button"
                disabled={loading}
                onClick={submitForm}
            >
                login
            </button>
        </div>
    )
}
export default LoginScreen

// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Navigate, useNavigate } from 'react-router-dom'

// import {
//     loginRequest,
//     loginSuccess,
//     logoutRequest,
// } from './reducers/loginReducer'

// const Login = () => {
//     let navigate = useNavigate()

//     const [loading, setLoading] = useState(false)

//     const { id, text, isLoading, loggedIn } = useSelector((state) => state.auth)

//     useEffect(() => {
//         console.log('auth', id, text, isLoading, loggedIn)
//         // console.log('isLoading', auth.isLoading)
//         // console.log('loggedIn', auth.loggedIn)
//         // console.log('text', auth.text)
//         // console.log('id', auth.id)
//     }, [])

//     const dispatch = useDispatch()

//     const initialValues = {
//         username: '',
//         password: '',
//     }

//     const handleLogin = (event) => {
//         const { username, password } = ['hello', 'world']
//         dispatch(loginRequest())
//         console.log('auth', id, text, isLoading, loggedIn)
//         // console.log(auth)
//         console.log('loginRequest dispatched')
//         dispatch(loginSuccess())
//         console.log('auth', id, text, isLoading, loggedIn)
//         console.log('loginSuccess dispatched')
//         axios
//             .post(
//                 `${BACKEND}/user/signin`,
//                 {
//                     email: email,
//                     password: password,
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )
//             .then((response) => response.data)
//             .then((res) => {
//                 console.log(res)

//                 if (res.msg === 'login successful') {
//                     console.log('Before the navigation')
//                     // navigate('/dashboard')
//                 }
//             })
//             .catch((error) => {
//                 console.log(error.response)
//             })

//         navigate('/')
//     }

//     return (
//         <div>
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     )
// }

// export default Login

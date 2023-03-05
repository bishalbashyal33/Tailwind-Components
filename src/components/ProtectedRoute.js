import React from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../actions/loginAction'

function Protected({ children }) {
    const { user_id, session_id } = useSelector((state) => state.auth)

    if (!user_id && !session_id) {
        console.log('redirected to the homepage')
        return <Navigate to="/" replace />
    }
    return children
}
export default Protected

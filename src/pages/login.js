import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../actions/loginAction'

function LogIn () {
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const navigate = useNavigate()
    const { session_id, loading, error } = useSelector( ( state ) => state.auth )
    const dispatch = useDispatch()

    const handleEmailChange = ( event ) => {
        setEmail( event.target.value )
    }

    const handlePasswordChange = ( event ) => {
        setPassword( event.target.value )
    }

    const handleSubmit = async ( event ) => {
        event.preventDefault()
        const userCredentials = {
            email: email,
            password: password,
        }

        dispatch( userLogin( userCredentials ) )
            .then( ( res ) => {
                navigate( "/dashboard" )
                // window.location.href = '/dashboard'
            } )
            .catch( ( err ) => {
                navigate( '/login' )
            } )
    }

    return (
        <div class="container mx-auto px-16 my-40">
            <div class="container lg:px-64 mt-20 shadow dark:bg-slate-500 rounded-lg px-4 py-4">
                <div class="mb-6">
                    <label
                        htmlFor="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        onChange={handleEmailChange}
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="user@email.com"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label
                        htmlFor="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default LogIn

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '../actions/loginAction'

function SignUp () {
    const [username, setUsername] = useState( '' )
    const [password, setPassword] = useState( '' )
    const [email, setEmail] = useState( '' )
    const [passwordError, setPasswordError] = useState( false )
    const [confirmPassword, setConfirmPassword] = useState( '' )
    const navigate = useNavigate()
    const { session_id, loading, error } = useSelector( ( state ) => state.auth )
    const dispatch = useDispatch()

    const handleSubmit = async ( event ) => {
        event.preventDefault()
        if ( password !== confirmPassword ) {
            setPasswordError( true )
            return
        }
        const userCredentials = {
            email: email,
            password: password,
            userName: username,
        }
        dispatch( userSignup( userCredentials ) )
            .then( ( res ) => {
                if ( res.payload.success ) {
                    navigate( "/login" )
                } else {
                    return
                }
            } )
            .catch( ( err ) => {
                navigate( '/signup' )
            } )
    }

    return (
        <div class="container mx-auto px-16 my-40">
            <div class="container lg:px-64 mt-20 shadow dark:bg-slate-500 rounded-lg px-4 py-4">
                <div class="mb-6">
                    <label
                        for="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={( e ) => setUsername( e.target.value )}
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={( e ) => setEmail( e.target.value )}
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="user@email.com"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        value={password}
                        onChange={( e ) => setPassword( e.target.value )}
                        type="password"
                        id="password"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="repeat-password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Repeat password
                    </label>
                    <input
                        value={confirmPassword}
                        onChange={( e ) => setConfirmPassword( e.target.value )}
                        type="password"
                        id="repeat-password"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                {passwordError && (
                    <div class="text-red-700 mb-2">
                        <p>Password does not match</p>
                    </div>
                )}
                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <label
                        for="terms"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        I agree with the{' '}
                        <a
                            href="#"
                            class="text-blue-600 hover:underline dark:text-blue-500"
                        >
                            terms and conditions
                        </a>
                    </label>
                </div>
                <button
                    onClick={handleSubmit}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Register new account
                </button>
            </div>
        </div>
    )
}

export default SignUp

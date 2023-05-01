import { useEffect, useState } from 'react'
import Dtoggle from '../toggle'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Settings ( props ) {
    const [showApiKey, setShowApiKey] = useState( false );
    const [apiKey, setApiKey] = useState( "" );

    useEffect( () => {
        axios( `${process.env.REACT_APP_BACKEND}/user/apikey`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                setApiKey( res.data.apikey )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )

    function toggleShowApiKey () {
        setShowApiKey( !showApiKey );
    }

    function copyApiKey () {
        navigator.clipboard.writeText( apiKey );
    }

    const generateApiKey = () => {
        axios( `${process.env.REACT_APP_BACKEND}/user/generate_apikey`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                toast.success( 'New API-KEY generated successully', { autoClose: 500, position: "bottom-right", theme: "dark", } )
                setApiKey( res.data.apikey )
            } )
            .catch( ( err ) => {
                toast.error( 'Failed to generate API-KEY', { autoClose: 500, position: "bottom-right", theme: "dark", } )
            } )
    }

    return (
        <div class="p-4 sm:ml-64">
            <ToastContainer />
            <div class="p-4 border-2 text-white border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                {/* <Dtoggle /> */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-600 dark:text-gray-400">API Key:</span>
                        <div className="relative">

                            <input
                                className={`${!showApiKey ? "text-gray-400" : "text-white"
                                    } bg-transparent w-full py-2 pl-2 pr-8 rounded-md border-2 border-gray-600 focus:outline-none focus:border-white transition-colors duration-300`}
                                type={!showApiKey ? "password" : "text"}
                                value={apiKey}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={toggleShowApiKey}
                                className="absolute inset-y-0 right-0 px-2 py-1.5 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                {showApiKey ? <EyeIcon /> : <EyeOffIcon />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={copyApiKey}
                        className="inline-flex items-center px-3 py-3 text-md leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 "
                    >
                        <ClipboardCopyIcon />
                        Copy
                    </button>
                    <button
                        type="button"
                        onClick={generateApiKey}
                        className="inline-flex items-center px-3 py-3 text-md leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 "
                    >
                        Regenerate
                    </button>
                </div>
            </div>

        </div>
    )
}
const ClipboardCopyIcon = () => {
    return (
        <div class="-ml-0.5 mt-0- mr-2 h-4 w-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19.92,3H7.08A2.08,2.08,0,0,0,5,5.08V19a2.08,2.08,0,0,0,2.08,2.08H19.92A2.08,2.08,0,0,0,22,19V5.08A2.08,2.08,0,0,0,19.92,3ZM7.08,4.16H19.92A.92.92,0,0,1,20.84,5.08V19a.92.92,0,0,1-.92.92H7.08a.92.92,0,0,1-.92-.92V5.08A.92.92,0,0,1,7.08,4.16Z" fill="#fff" />
                <path d="M15.93,10.84H14.84V9.75a.75.75,0,0,0-1.5,0v1.09H11.93a.75.75,0,1,0,0,1.5h1.41v1.09a.75.75,0,0,0,1.5,0V12.34h1.09a.75.75,0,0,0,0-1.5Z" fill="#fff" />
            </svg>

        </div>
    )
}

const EyeIcon = () => {
    return (
        <div class="h-5 w-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5c-6.6 0-12 6.6-12 7.5s5.4 7.5 12 7.5c6.6 0 12-6.6 12-7.5s-5.4-7.5-12-7.5zm0 12c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
        </div>
    )
}

const EyeOffIcon = () => {
    return (
        <div class="h-5 w-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20.71,19.29l-16-16A1,1,0,0,0,3.29,4.71l16,16a1,1,0,0,0,1.42,0A1,1,0,0,0,20.71,19.29ZM12,17a4.94,4.94,0,0,1-4.46-2.88l1.43-1.43A3,3,0,0,0,12,14a3,3,0,0,0,3-3,3,3,0,0,0-1.18-2.39L14,7.46A4.94,4.94,0,0,1,17.82,12,4.89,4.89,0,0,1,12,17Zm6.88-7.83A6,6,0,0,0,12,5a6.06,6.06,0,0,0-5.34,3.26l1.43,1.43A4,4,0,0,1,12,7a4,4,0,0,1,4,4,4,4,0,0,1-1.56,3.17l1.43,1.43A6,6,0,0,0,18.88,9.17Z" />
            </svg>
        </div> )
}
export default Settings
